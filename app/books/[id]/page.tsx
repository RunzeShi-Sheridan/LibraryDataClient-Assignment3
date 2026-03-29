"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { getBookById } from "@/lib/api/books"
import { Book } from "@/lib/api/types"

type BookDetailsPageProps = {
  params: Promise<{
    id: string
  }>
}

export default function BookDetailsPage({ params }: BookDetailsPageProps) {
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [id, setId] = useState("")

  useEffect(() => {
    async function loadBook() {
      try {
        const resolvedParams = await params
        setId(resolvedParams.id)
        const data = await getBookById(resolvedParams.id)
        setBook(data)
      } catch (err) {
        console.error(err)
        setError("Failed to load book details.")
      } finally {
        setLoading(false)
      }
    }

    loadBook()
  }, [params])

  return (
    <main className="p-6">
      <Link
        href="/"
        className="mb-4 inline-block text-blue-600 hover:underline"
      >
        ← Back to books
      </Link>

      {loading && <p>Loading book details...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && book && (
        <div className="rounded-lg border p-6">
          <h1 className="mb-4 text-3xl font-bold">{book.bookTitle}</h1>
          <p>ID: {book.itemId}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Pages: {book.pageCount}</p>
          <p>Available: {book.isAvailable ? "Yes" : "No"}</p>
          <p>Late Fee: ${book.lateFeeUsd}</p>
        </div>
      )}

      {!loading && !error && !book && <p>Book not found: {id}</p>}
    </main>
  )
}
