import { useEffect, useRef, useState } from "react"
import { User } from "../interfaces"
import { fetchUsersApi } from "../services/fetchUsers"

export function useUsers () {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const originalUsers = useRef<User[]>([])
    

    const fecthUsers = async ({ page } : { page: number}) => {
        try {            
            setLoading(true)
            setError('')
            const { users: usersValue } = await fetchUsersApi({ page })                        
            setUsers(prevUsers => {                 
                originalUsers.current = prevUsers.concat(usersValue)
                return prevUsers.concat(usersValue)
            })
        } catch (error: unknown) {
            setError('Lo sentimos algo salio mal, intentalo mas tarde porfavor.')
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fecthUsers({ page: currentPage })
      }, [currentPage])

    return {
        fecthUsers, users, setUsers, 
        originalUsers,
        loading, error, 
        setCurrentPage, currentPage
    }
}