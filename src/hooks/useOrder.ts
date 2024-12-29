import { useMemo } from "react";
import type { User } from "../interfaces";
import type { SortByOptions } from "../interfaces/sortBy";
import { SORT_BY } from "../constants/sortBy";

interface HookParams {
    users: User [],
    sortBy: SortByOptions
}

const sortDic = {
    [SORT_BY.country]: (a: User) => a.location.country,
    [SORT_BY.lastname]: (a: User) => a.name.last,
    [SORT_BY.name]: (a: User) => a.name.first,
}

export function useOrderUsers ({ users, sortBy }: HookParams) {
     const sortedUsers = useMemo(() => {
        console.log('sorted');
        if (!sortBy) return users
        
        console.log('DEBE ordenar wn');    
        
        const orderUsers = (a: User, b: User) => {
          const getProperty = sortDic[sortBy]
    
          const value = getProperty(a)
          const current = getProperty(b)
          return value.localeCompare(current)      
        }
    
        return sortBy 
          ? users.toSorted(orderUsers)
          : users
      }, [users, sortBy]) 

    return sortedUsers
}