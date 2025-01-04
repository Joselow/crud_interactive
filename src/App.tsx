import { useQuery } from '@tanstack/react-query'

import { useState } from 'react'
import './App.css'
import { UserList } from './Components/UserList'
import { FilterUsers } from './Components/FilterUsers'

import type { SortByOptions } from './interfaces/sortBy'
import { useUsers } from './hooks/useUsers'
import { useFilterUsers } from './hooks/useFilter'
import { useOrderUsers } from './hooks/useOrder'
import { fetchUsersApi } from './services/fetchUsers'

function App() {
  const { users, loading, error, originalUsers, setUsers, setCurrentPage, currentPage } = useUsers()
  // const info = useQuery({ queryKey: ['users'], queryFn: () => fetchUsersApi() })


  const [paintRows, setPaintRows] = useState(false)
  const [sortBy, setSortBy] = useState<SortByOptions>(null)
  const [searchCountry, setSearchedCountry] = useState('')

  const togglePaintRows = () => {
    setPaintRows(!paintRows)
  }

  const selectSortBy = (newsortBy: SortByOptions) => {
    if (sortBy) {
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

  const filteredUsers = useFilterUsers({ users, searchValue: searchCountry })
  const sortedUsers =  useOrderUsers({ users: filteredUsers, sortBy })
  return (
    <>
      INTERACTIVE CRUD 
      <div>
        { error }
      </div>
     
     <header style={{ margin: "20px 0px" }}>

        <FilterUsers
          togglePaintRows={togglePaintRows}
          selectSortBy={selectSortBy}
          restoreUsers={restoreUsers}
        />
        <br />
        <input placeholder='Filtra por columnas' type="text" 
          style={{ margin: "10px 0px" }}
          onChange={(e) => setSearchedCountry(e.target.value)}
        />
     </header>
     <main>
      {
        sortBy
      }
       <div>
        { loading && 'LOADING...' }
      </div>

      {
        users.length && 
          <UserList 
          users={sortedUsers}
          paintRows={paintRows}
          deleteUser={handleDelete}
          sortBy={selectSortBy}
        />
      }

      {
        !loading && !error &&
          <button onClick={() => setCurrentPage(currentPage + 1)}>
            Cargar más
          </button>
      }
      
     </main>
    </>
  )
}

export default App
