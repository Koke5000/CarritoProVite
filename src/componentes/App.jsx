import { useState, useEffect } from 'react'
import URL_SERVER from '../../url'
import NoLogin from './NoLogin';
import Login from './Login';


function App() {
  const [isUserLogin, setIsUserLogin] = useState(JSON.parse(localStorage.getItem("usuarioIniciado"))||[]);
  const [filterText, setFilterText] = useState('');
  const [articulosLista, setArticulosLista] = useState([]);
  const [pintaArticulos, setPintaArticulos] = useState(false);

  useEffect(() => {
    fetch(URL_SERVER+"articulos?nombre_like="+filterText)
    .then(response => {
      if (response.ok)
        return response.json();
      throw new Error(response.json());
    })
    .then(data => {
      setArticulosLista(data);
    })
    .catch(err => {
      console.error("ERROR: ", err.message)
    });
    setPintaArticulos(false);
  }, [filterText, pintaArticulos]);


  return (
    <>
      {isUserLogin.length !==0 ? 
      <Login filterText={filterText} setFilterText={setFilterText} 
      articulosLista={articulosLista} setPintaArticulos={setPintaArticulos} setIsUserLogin={setIsUserLogin}/> : 
      <NoLogin filterText={filterText} setFilterText={setFilterText} 
      articulosLista={articulosLista} setIsUserLogin={setIsUserLogin}/>}
    </>
  )
}

export default App
