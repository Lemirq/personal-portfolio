'use server'

import { createClient } from "next-sanity";
import { token } from "../../sanity/env";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'zvfxtzrz'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = 'vX' // Experimental API version

// Create a client with the write token and vX API version
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: true, // We need fresh data and write access
})

export async function runTransformAction(formData: FormData) {
  const documentId = formData.get('documentId') as string
  const instruction = formData.get('instruction') as string
  const schemaId = formData.get('schemaId') as string

  if (!documentId || !instruction || !schemaId) {
    return { success: false, error: "Missing required fields" }
  }

  try {
    // We need to type cast client as any because agent property might not be in the definition yet
    // or use specific new types if available.
    const sanityClient = client as any

    if (!sanityClient.agent || !sanityClient.agent.action) {
       // Fallback or check if we need to construct it differently? 
       // The guide says: client.agent.action.transform
       // If standard client doesn't have it, we might need "@sanity/client" specifically instead of "next-sanity" wrapper if it hides it.
       // "next-sanity" usually exports a client that is compatible.
       // But to be safe, let's use @sanity/client directly if next-sanity is missing features.
    }

    const result = await sanityClient.agent.action.transform({
      schemaId,
      documentId,
      instruction,
    })

    return { success: true, result }
  } catch (error: any) {
    console.error("Transform error:", error)
    return { success: false, error: error.message || "Unknown error occurred" }
  }
}


export async function getDocumentTypes() {
  try {
    const types = await client.fetch<string[]>(`array::unique(*[!(_id in path("drafts.**")) && !(_type match "system.*")]._type)`)
    return { success: true, types: types.sort() }
  } catch (error) {
    console.error("Error fetching types:", error)
    return { success: false, types: [] }
  }
}

export async function getDocuments(type?: string) {
  try {
    const query = type 
      ? `*[_type == $type && !(_id in path("drafts.**"))]{_id, _type, title, name, "preview": coalesce(title, name, _id)}`
      : `*[!(_id in path("drafts.**"))][0...100]{_id, _type, title, name, "preview": coalesce(title, name, _id)}`
      
    const documents = await client.fetch(query, type ? { type } : {})
    return { success: true, documents }
  } catch (error) {
    console.error("Error fetching documents:", error)
    return { success: false, documents: [] }
  }
}

export async function getSchemas() {
  // fast-listing the default schema, in a real app might verify existence
  // or use an internal API if available. 
  return { success: true, schemas: ['_.schemas.default'] }
}
