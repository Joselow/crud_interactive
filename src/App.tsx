import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { User } from './interfaces'

import { UserList } from './Components/UserList'
import type { SortByOptions } from './interfaces/sortBy'
import { SORT_BY } from './constants/sortBy'
import { useUsers } from './hooks/useUsers'

function App() {

  const { users, fecthUsers, loading, error, originalUsers, setUsers } = useUsers()

  const [paintRows, setPaintRows] = useState(false)
  const [sortBY, setSortBy] = useState<SortByOptions>(null)
  const [searchCountry, setSearchedCountry] = useState('')

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
    fecthUsers()
  }, [])



  const filteredUsers = useMemo(() => {
    console.log('filtered');
    const searchValue = searchCountry.trim()

    return searchValue.length > 0 
    ?  users.filter(u => u.location.country.toLowerCase().includes(searchValue.toLowerCase()))
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


  console.log('RE render');
  return (
    <>
      INTERACTIVE CRUD 
      <div>
        { error }
      </div>
      <div>
        { loading && 'LOADING...' }
      </div>
     <header style={{ margin: "20px 0px" }}>
        <button onClick={togglePaintRows}>Colorear Filas</button>
        <button onClick={() => selectSortBy(SORT_BY.country)}>Ordenar por pais</button>
        <button onClick={restoreUsers}>Restaurar datos</button>
        <br />
        <input placeholder='Filtra por pais' type="text" 
          style={{ margin: "10px 0px" }}
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
