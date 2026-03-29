import axios from "axios"
import { Book } from "./types"

const api = axios.create({
  baseURL: "http://localhost:8080",
})

export async function getBooks(): Promise<Book[]> {
  const response = await api.get<Book[]>("/api/books")
  return response.data
}

export async function getBookById(id: string): Promise<Book> {
  const response = await api.get<Book>(`/api/books/${id}`)
  return response.data
}
