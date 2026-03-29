import axios from "axios"
import { Book } from "./types"

const api = axios.create({
  baseURL: "http://localhost:8080",
})

export async function getBooks(): Promise<Book[]> {
  const response = await api.get<Book[]>("/api/books")
  console.log("books response:", response.data)
  return response.data
}
