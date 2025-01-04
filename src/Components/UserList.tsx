import { SORT_BY } from "../constants/sortBy";
import { User } from "../interfaces";
import { SortByOptions } from "../interfaces/sortBy";

interface Props {
    users: User[],
    paintRows: boolean,
    deleteUser: (uuid: string) => void,
    sortBy: (sortOption: SortByOptions) => void
}

export function UserList ({ users, paintRows, deleteUser, sortBy }: Props) {

    return <>
        <table>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th onClick={() => sortBy(SORT_BY.name)}>Nombre</th>
                    <th onClick={() => sortBy(SORT_BY.lastname)}>Apellido</th>
                    <th onClick={() => sortBy(SORT_BY.country)}>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => {
                        const backgroundRow = index % 2 == 0 ? '#333' : '#666'
                        const color = paintRows ? backgroundRow : 'transparent'
                        return (
                            <tr key={user.login.uuid}
                                style={{ backgroundColor: color} }
                            > 
                                <td>
                                    <img src={user.picture.thumbnail} alt="img" />
                                </td>
                                <td>
                                    { user.name.first }
                                </td>
                                <td>
                                    {user.name.last }
                                </td>
                                <td>
                                    {user.location.country }
                                </td>
                                <td>                      
                                    <button onClick={() => deleteUser(user.login.uuid)}>Eliminar</button>              
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </>
}