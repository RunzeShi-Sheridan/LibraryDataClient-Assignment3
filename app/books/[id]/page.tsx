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
        className="mb-6 inline-block text-blue-600 hover:underline"
      >
        ← Back to books
      </Link>

      {loading && <p>Loading book details...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && book && (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <p className="mb-2 text-sm text-gray-500">Book Details</p>
          <h1 className="mb-6 text-3xl font-bold">{book.bookTitle}</h1>

          <div className="space-y-2 text-base">
            <p>
              <span className="font-semibold">ID:</span> {book.itemId}
            </p>
            <p>
              <span className="font-semibold">ISBN:</span> {book.isbn}
            </p>
            <p>
              <span className="font-semibold">Pages:</span> {book.pageCount}
            </p>
            <p>
              <span className="font-semibold">Available:</span>{" "}
              {book.isAvailable ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Late Fee:</span> $
              {book.lateFeeUsd}
            </p>
          </div>
        </div>
      )}

      {!loading && !error && !book && <p>Book not found: {id}</p>}
    </main>
  )
}
