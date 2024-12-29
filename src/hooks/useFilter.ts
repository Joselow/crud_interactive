import { useMemo } from "react";
import { User } from "../interfaces";

interface FilterParams { 
    users: User[],
    searchValue: string,
}

export function useFilterUsers ({ users, searchValue }: FilterParams) {

  const filteredUsers = useMemo(() => {
    const search = searchValue.trim()

    const filterUser = (user: User) => {
        const { name, location } = user
        const matchName = name.first.toLowerCase().includes(search.toLowerCase())
        const matchLastName = name.last.toLowerCase().includes(search.toLowerCase())
        const matchCountry = location.country.toLowerCase().includes(search.toLowerCase())

        return matchName || matchLastName || matchCountry
    }

    return search.length > 0 
    ?  users.filter(filterUser)
    : users
  }, [users, searchValue])

  return filteredUsers
}
