"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ParticlesBackground from "@/components/ParticlesBackground"

export default function LandingPage() {
  const [name, setName] = useState("")
  const [users, setUsers] = useState<string[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      await saveUser(name)
      setName("")
      await fetchUsers()
    }
  }

  const saveUser = async (name: string) => {
    // Simulating API call to save user
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log("User saved:", name)
  }

  const fetchUsers = async () => {
    // Simulating API call to fetch users
    await new Promise((resolve) => setTimeout(resolve, 500))
    const mockUsers = ["Alice", "Bob", "Charlie", "David"]
    setUsers(mockUsers)
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <ParticlesBackground />
      <div className="w-full max-w-md space-y-8 relative z-10">
        <h1 className="text-3xl font-bold text-center text-white">Bienvenido a nuestra Landing Page</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Ingresa tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white bg-opacity-20 text-white placeholder-gray-300"
          />
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Guardar
          </Button>
        </form>

        <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-2 text-white">Usuarios registrados:</h2>
          <ul className="list-disc pl-5">
            {users.map((user, index) => (
              <li key={index} className="text-gray-200">
                {user}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

