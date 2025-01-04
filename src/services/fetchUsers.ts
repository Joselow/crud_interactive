import  { type Root } from "../interfaces"

export const fetchUsersApi = async ({ page = 1 } = {}) => {
     const response = await fetch('https://randomuser.me/api?results=20&seed=pro&page='+page)

     if (!response.ok) {
        throw Error('Something was wrong')
     }
     const { info, results } = await response.json() as Root
     
     return { metadata: info, users: results }
}


