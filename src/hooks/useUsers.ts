import { useEffect, useRef, useState } from "react"
import { User } from "../interfaces"
import { fetchUsersApi } from "../services/fetchUsers"

export function useUsers () {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const originalUsers = useRef<User[]>([])
    

    const fecthUsers = async () => {
        try {            
            setLoading(true)
            setError('')
            const { users: usersValue } = await fetchUsersApi()                        
            setUsers(usersValue)
            originalUsers.current = usersValue
        } catch (error: unknown) {
            setError('Lo sentimos algo salio mal, intentalo mas tarde porfavor.')
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fecthUsers()
      }, [])

    return {
        fecthUsers, users, loading, error, originalUsers,
        setUsers
    }
}