import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { User } from './interfaces'

import { UserList } from './Components/UserList'
import type { SortByOptions } from './interfaces/sortBy'
import { SORT_BY } from './constants/sortBy'



function App() {
  const [users, setUsers] = useState<User[]>([])
  const [paintRows, setPaintRows] = useState(false)
  const [sortBY, setSortBy] = useState<SortByOptions>(null)
  const [searchCountry, setSearchedCountry] = useState('')
  const originalUsers = useRef<User[]>([])

  const togglePaintRows = () => {
    setPaintRows(!paintRows)
  }

  const selectSortBy = (newsortBy: SortByOptions) => {
    if (sortBY) {
      setSortBy(null)
    } else {
      setSortBy(newsortBy)
    }
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
    if (!sortBY) return filteredUsers
    
    const sortDic = {
      [SORT_BY.country]: (a: User, b: User) => a.location.country.localeCompare(b.location.country),
      [SORT_BY.lastname]: (a: User, b: User) => a.name.last.localeCompare(b.name.last),
      [SORT_BY.name]: (a: User, b: User) => a.name.first.localeCompare(b.name.first),
    }
    console.log('DEBE ordenar wn');
    

    return sortBY 
      ? filteredUsers.toSorted(sortDic[sortBY])
      : filteredUsers
  }, [filteredUsers, sortBY]) 

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
        <button onClick={() => selectSortBy(SORT_BY.country)}>Ordenar por pais</button>
        <button onClick={restoreUsers}>Restaurar datos</button>
        <input placeholder='Filtra por pais' type="text" 
          onChange={(e) => setSearchedCountry(e.target.value)}
        />
     </header>
     <main>
      {
        sortBY
      }
      <UserList 
        users={sortedUsers}
        paintRows={paintRows}
        deleteUser={handleDelete}
        sortBy={selectSortBy}
        />
     </main>
    </>
  )
}

export default App
