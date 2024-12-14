import { User } from "../interfaces";

interface Props {
    users: User[],
    paintRows: boolean
}

export function UserList ({ users, paintRows }: Props) {


    return <>
        <table>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) =>{
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
                                    <button>Eliminar</button>              
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </>
}