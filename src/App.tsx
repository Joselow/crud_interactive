import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { User } from './interfaces'

import { UserList } from './Components/UserList'



function App() {
  const [users, setUsers] = useState<User[]>([])
  const [paintRows, setPaintRows] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [searchCountry, setSearchedCountry] = useState('')
  const originalUsers = useRef<User[]>([])

  const togglePaintRows = () => {
    setPaintRows(!paintRows)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(!sortByCountry)
  }
  const restoreUsers = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (uuid: string) => {
    const newUsers = users.filter(u => u.login.uuid !== uuid)
    setUsers(newUsers)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
    .then((res) => res.json())
    .then(res => {
      setUsers(res.results)
      originalUsers.current = res.results
    })
  }, [])


  const filteredUsers = useMemo(() => {
    console.log('filtered');

    return searchCountry.length > 0 
    ?  users.filter(u => u.location.country.toLowerCase().includes(searchCountry.toLowerCase()))
    : users
  }, [users, searchCountry])

  const sortedUsers = useMemo(() => {
    console.log('sorted');
    
    return sortByCountry 
      ? filteredUsers.toSorted((a, b) =>a.location.country.localeCompare(b.location.country))
      : filteredUsers
  }, [filteredUsers, sortByCountry]) 

  // const filteredUsers = searchCountry.length > 0 
  //       ?  users.filter(u => u.location.country.toLowerCase().includes(searchCountry.toLowerCase()))
  //       : users

  // const sortedUsers = 

  console.log('render');


  return (
    <>
     Prueba 
     <header>
        <button onClick={togglePaintRows}>Colorear Filas</button>
        <button onClick={toggleSortByCountry}>Ordenar por pais</button>
        <button onClick={restoreUsers}>Restaurar datos</button>
        <input placeholder='Filtra por pais' type="text" 
          onChange={(e) => setSearchedCountry(e.target.value)}
        />
     </header>
     <main>
      <UserList 
        users={sortedUsers}
        paintRows={paintRows}
        deleteUser={handleDelete}
        />
     </main>
    </>
  )
}

export default App
