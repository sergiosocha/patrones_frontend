"use client"

import { useState, useEffect } from "react"
import ParticlesBackground from "./components/ParticlesBackground"
import "./App.css"

function App() {
  const [name, setName] = useState("")
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (name.trim()) {
      await saveUser(name)
      setName("")
      await fetchUsers()
    }
  }

  const saveUser = async (name) => {

    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log("User saved:", name)
  }

  const fetchUsers = async () => {

    await new Promise((resolve) => setTimeout(resolve, 500))
    const mockUsers = ["Alice", "Bob", "Charlie", "David"]
    setUsers(mockUsers)
  }

  return (
    <div className="App">
      <ParticlesBackground />
      <div className="content">
        <h1>Bienvenido a patrones</h1>
        <h2>Ingrese su nombre</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Ingresa tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit">Guardar</button>
        </form>

        <div className="users-list">
          <h2>Usuarios registrados:</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App

