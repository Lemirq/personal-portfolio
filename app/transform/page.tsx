'use client'

import { useState, useEffect } from 'react'
import { runTransformAction, getDocuments, getSchemas, getDocumentTypes } from './actions'
import posthog from 'posthog-js'

export default function TransformPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const [types, setTypes] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string>('')
  const [documents, setDocuments] = useState<any[]>([])
  const [schemas, setSchemas] = useState<string[]>([])
  const [loadingInitial, setLoadingInitial] = useState(true)
  const [loadingDocs, setLoadingDocs] = useState(false)

  // Load initial data (types and schemas)
  useEffect(() => {
    Promise.all([
      getDocumentTypes().then(res => res.success && setTypes(res.types)),
      getSchemas().then(res => res.success && setSchemas(res.schemas))
    ]).finally(() => setLoadingInitial(false))
  }, [])

  // Load documents when type changes
  useEffect(() => {
    if (!selectedType) {
      setDocuments([])
      return
    }
    setLoadingDocs(true)
    getDocuments(selectedType)
      .then(res => res.success && setDocuments(res.documents))
      .finally(() => setLoadingDocs(false))
  }, [selectedType])

  async function handleSubmit(formData: FormData) {
    setStatus('loading')
    setError(null)
    setResult(null)

    const schemaId = formData.get('schemaId') as string
    const documentId = formData.get('documentId') as string
    const instruction = formData.get('instruction') as string

    const res = await runTransformAction(formData)

    if (res.success) {
      setStatus('success')
      setResult(res.result)
      posthog.capture('transform_executed', {
        schema_id: schemaId,
        document_id: documentId,
        document_type: selectedType,
        instruction_length: instruction.length,
        success: true,
      })
    } else {
      setStatus('error')
      setError(res.error as string)
      posthog.capture('transform_executed', {
        schema_id: schemaId,
        document_id: documentId,
        document_type: selectedType,
        instruction_length: instruction.length,
        success: false,
        error: res.error,
      })
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Sanity Transform API Agent</h1>
        <p className="mb-8 text-neutral-400">
          Experimental feature to run AI transformations on your Sanity content.
        </p>

        <form action={handleSubmit} className="space-y-6 bg-neutral-800 p-6 rounded-xl border border-neutral-700">
          
          <div>
            <label htmlFor="schemaId" className="block text-sm font-medium mb-2">Schema ID</label>
            {loadingInitial ? (
              <div className="h-10 bg-neutral-900 rounded-lg animate-pulse" />
            ) : (
              <select 
                name="schemaId" 
                id="schemaId" 
                required
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-hidden appearance-none"
              >
                {schemas.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            )}
          </div>

          <div className="flex gap-4">
            <div className="w-1/3">
              <label htmlFor="docType" className="block text-sm font-medium mb-2">Document Type</label>
              {loadingInitial ? (
                <div className="h-10 bg-neutral-900 rounded-lg animate-pulse" />
              ) : (
                <select 
                  id="docType"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-hidden appearance-none"
                >
                  <option value="">Select Type...</option>
                  {types.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              )}
            </div>
            
            <div className="flex-1">
              <label htmlFor="documentId" className="block text-sm font-medium mb-2">Document</label>
              {loadingDocs || loadingInitial ? (
                <div className="h-10 bg-neutral-900 rounded-lg animate-pulse" />
              ) : (
                <select 
                  name="documentId" 
                  id="documentId" 
                  required
                  disabled={!selectedType}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-hidden appearance-none disabled:opacity-50"
                >
                  <option value="">{selectedType ? "Select a document..." : "Select type first"}</option>
                  {documents.map(doc => (
                    <option key={doc._id} value={doc._id}>
                      {doc.preview}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <p className="text-xs text-neutral-500 -mt-4">Target document ID</p>

          <div>
            <label htmlFor="instruction" className="block text-sm font-medium mb-2">Instruction</label>
            <textarea 
              name="instruction" 
              id="instruction" 
              rows={4}
              placeholder="e.g. Change all instances of 'Alien' to 'Lifeform'. Match case."
              required
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-hidden"
            />
          </div>

          <button 
            type="submit" 
            disabled={status === 'loading' || loadingInitial}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Processing...
              </span>
            ) : 'Run Transformation'}
          </button>
        </form>

        {status === 'error' && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            <h3 className="font-semibold mb-1">Error</h3>
            <p>{error}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
            <h3 className="font-semibold mb-2">Success</h3>
            <pre className="bg-black/30 p-4 rounded overflow-x-auto text-xs font-mono">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
