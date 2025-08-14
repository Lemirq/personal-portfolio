"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function InvoicesLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/invoices";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/invoices/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Invalid password");
        setLoading(false);
        return;
      }
      router.replace(next);
    } catch (e: any) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#000318] text-white flex items-center justify-center p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-[#0b0f26] border border-[#1a1f3d] rounded-xl p-5 space-y-4"
      >
        <h1 className="text-xl font-semibold">Invoices Login</h1>
        <input
          className="w-full bg-[#0d112a] border border-[#1a1f3d] rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? <div className="text-rose-400 text-sm">{error}</div> : null}
        <button
          disabled={loading}
          className="w-full px-3 py-2 rounded text-sm font-medium bg-violet-600 disabled:opacity-50"
        >
          {loading ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}
