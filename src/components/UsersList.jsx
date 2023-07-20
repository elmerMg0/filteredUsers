import { header } from "../App";

const UsersList = ({ users, showColors, handleDeleteUser, changeSorting }) => {
  return (
    <table>
      <thead>
        <tr>
          <th >Foto</th>
          <th onClick={() => changeSorting(header.NOMBRE)}>Nombre</th>
          <th onClick={() => changeSorting(header.APELLIDO)}>APellido</th>
          <th onClick={() => changeSorting(header.PAIS)}>Pais</th>
          <th >Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.length > 0 &&
          users.map((user, index) => {

            const background = index % 2 === 0 ? '#3333': '#444'; 
            const color = showColors ? background: 'transparent'
            return (
              <tr key={user.email} style={{backgroundColor: color}}>
                <td>
                  {" "}
                  <img src={user.picture.thumbnail} alt="" />{" "}
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  {" "}
                  <button onClick={() => handleDeleteUser(user.email)}>delete</button>{" "}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
export default UsersList;
