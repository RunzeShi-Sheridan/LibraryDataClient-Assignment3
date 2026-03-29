"use client"

import { useEffect, useState } from "react"
import { Book } from "@/lib/api/types"
import { getBooks } from "@/lib/api/books"

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await getBooks()
        setBooks(data)
      } catch (err) {
        console.error(err)
        setError("Failed to load books.")
      } finally {
        setLoading(false)
      }
    }

    loadBooks()
  }, [])

  return (
    <main className="p-6">
      <h1 className="mb-4 text-3xl font-bold">Library Books</h1>

      {loading && <p>Loading books...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="space-y-3">
          {books.map((book) => (
            <div key={book.itemId} className="rounded-lg border p-4">
              <h2 className="text-xl font-semibold">{book.bookTitle}</h2>
              <p>ID: {book.itemId}</p>
              <p>ISBN: {book.isbn}</p>
              <p>Pages: {book.pageCount}</p>
              <p>Available: {book.isAvailable ? "Yes" : "No"}</p>
              <p>Late Fee: ${book.lateFeeUsd}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
