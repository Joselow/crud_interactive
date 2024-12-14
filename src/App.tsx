import { useEffect, useState } from 'react'
import './App.css'
import { User } from './interfaces'

import { UserList } from './Components/UserList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [paintRows, setPaintRows] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)

  const togglePaintRows = () => {
    setPaintRows(!paintRows)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(!sortByCountry)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
    .then((res) => res.json())
    .then(res => {
      setUsers(res.results)
    })
  }, [])
  return (
    <>
     Prueba 
     <header>
        <button onClick={togglePaintRows}>Colorear Filas</button>
        <button onClick={togglePaintRows}>Ordenar por pais</button>
     </header>
     <main>
      <UserList 
        users={users}
        paintRows={paintRows}
        />
     </main>
    </>
  )
}

export default App
