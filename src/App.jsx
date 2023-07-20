import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import UsersList from './components/UsersList';

export const header = {
  NONE: 'none',
  NOMBRE: 'nombre',
  APELLIDO: 'apellido',
  PAIS: 'pais'
}

function App() {

  const [users, setUsers] = useState([]);
  const [ showColors, setShowColors] = useState(false);
  const usersInitial = useRef(null);
  const [ filterByCountry, setFilterByCountry] = useState(null);
  const [ sorting, setSorting] = useState(header.NONE);

  const toggleColors = () => {
    setShowColors(!showColors);
  }

  const toggleSortByCountry = () => {
    const newSort = header.PAIS === sorting? header.NONE : header.PAIS;
    setSorting(newSort);
  }

  const handleDeleteUser = (email) => {
    const usersFiltered = users.filter( user => user.email !== email);
    setUsers(usersFiltered)
  }

  const changeSorting = ( sortName ) => {
    setSorting(sortName )
  }

  const filteredUsers = useMemo(() => {
    return filterByCountry !== null && filterByCountry.length > 0 ? 
     users.filter( user => user.location.country.toLowerCase().includes(filterByCountry.toLowerCase()))              
    :
    users
  },[filterByCountry, users])

  const sortedUsers = useMemo(() => {
    console.log('sortedUSERS')

    if(sorting === 'none') return filteredUsers;

    const compareProperties = {
      [header.PAIS]: user => user.location.country,
      [header.NOMBRE]: user => user.name.first,
      [header.APELLIDO]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  
  },[filteredUsers, sorting])

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
    .then( result => result.json())
    .then( res => {
      setUsers(res.results)
      usersInitial.current = res.results;
    })
    .catch(err => console.error(err))
  }, [])
  
  return (
    <div className='app'>
    <h1>Prueba tecnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>{
          sorting === header.PAIS  ? 'no ordernado': 'Paises ordernados'
        }</button>
        <button onClick={() => setUsers(usersInitial.current)}>Restaurar users</button>
        <input type="text"
            placeholder='nombre pais'
            onChange={(e) => setFilterByCountry(e.target.value) }
          />
      </header>
      <UsersList changeSorting={changeSorting} users={sortedUsers} showColors={showColors} handleDeleteUser={handleDeleteUser}/>
    </div>
  )
}

export default App
//