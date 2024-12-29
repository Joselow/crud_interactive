import { useState } from 'react'
import './App.css'
import { UserList } from './Components/UserList'
import { FilterUsers } from './Components/FilterUsers'

import type { SortByOptions } from './interfaces/sortBy'
import { useUsers } from './hooks/useUsers'
import { useFilterUsers } from './hooks/useFilter'
import { useOrderUsers } from './hooks/useOrder'

function App() {
  const { users, loading, error, originalUsers, setUsers } = useUsers()

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
