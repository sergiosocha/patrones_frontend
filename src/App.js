"use client"

import { useState, useEffect } from "react"
import ParticlesBackground from "./components/ParticlesBackground"
import "./App.css"

function App() {
  const [name, setName] = useState("")
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")

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

  const saveUser = async (nombre) => {
    try {
      const response = await fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre }),
        credentials: "include",  // Incluir credenciales si es necesario
      })

      if (!response.ok) {
        throw new Error("Error al guardar el usuario")
      }

      const data = await response.json()
      console.log("Usuario guardado:", data)
    } catch (error) {
      console.error("Error:", error)
      setError("Error al guardar el usuario. Por favor, intenta de nuevo.")
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/todos", {
        method: "GET",
        credentials: "include",  // Incluir credenciales si es necesario
      })
      if (!response.ok) {
        throw new Error("Error al obtener los usuarios")
      }
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Error:", error)
      setError("Error al cargar los usuarios. Por favor, recarga la página.")
    }
  }

  return (
      <div className="App">
        <ParticlesBackground />
        <div className="content">
          <h1>BIENVENIDOS A PATRONES</h1>
          <h2>Ingrese su nombre</h2>

          <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="Nombre de usuario"
            />
            <button type="submit">Guardar</button>
          </form>

          {error && <p className="error-message">{error}</p>}

          <div className="users-list">
            <h2>Usuarios registrados:</h2>
            <ul>
              {users.map((user, index) => (
                  <li key={index}>{user.nombre}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  )
}

export default App

