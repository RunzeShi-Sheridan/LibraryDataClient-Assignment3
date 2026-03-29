"use client"

import Link from "next/link"
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Library Books</h1>
        <p className="mt-2 text-sm text-gray-600">
          Browse the available library collection and open a book to view its
          details.
        </p>
      </div>

      {loading && <p>Loading books...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b px-4 py-3 text-left">Title</th>
                <th className="border-b px-4 py-3 text-left">ID</th>
                <th className="border-b px-4 py-3 text-left">ISBN</th>
                <th className="border-b px-4 py-3 text-left">Pages</th>
                <th className="border-b px-4 py-3 text-left">Available</th>
                <th className="border-b px-4 py-3 text-left">Late Fee</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.itemId} className="hover:bg-gray-50">
                  <td className="border-b px-4 py-3">
                    <Link
                      href={`/books/${book.itemId}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {book.bookTitle}
                    </Link>
                  </td>
                  <td className="border-b px-4 py-3">{book.itemId}</td>
                  <td className="border-b px-4 py-3">{book.isbn}</td>
                  <td className="border-b px-4 py-3">{book.pageCount}</td>
                  <td className="border-b px-4 py-3">
                    {book.isAvailable ? "Yes" : "No"}
                  </td>
                  <td className="border-b px-4 py-3">${book.lateFeeUsd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
