import { auth } from './firebase'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function apiFetch(path: string, options: RequestInit = {}) {
  const user = auth.currentUser
  const token = user ? await user.getIdToken() : null

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  return res.json()
}