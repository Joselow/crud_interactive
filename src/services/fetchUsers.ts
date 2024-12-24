import  { type Root } from "../interfaces"

export const fetchUsersApi = async () => {
     const response = await fetch('https://randomuser.me/api?results=100')

     if (!response.ok) {
        throw Error('Something was wrong')
     }
     const { info, results } = await response.json() as Root
     
     return { metadata: info, users: results }
}


