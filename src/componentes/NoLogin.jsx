import BarraBusqueda from "./BarraBusqueda"
import InicioSesion from "./InicioSesion"
import RegistrarUsuario from './RegistrarUsuario'
import { useState } from 'react'
export default function NoLogin({filterText, setFilterText, articulosLista, setIsUserLogin}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [clickButtonRegistrar, setClickButtonRegistrar] = useState(false);

    return(
        <>
            <h1>Lista de Articulos (No Logeado)</h1>

            {clickButtonRegistrar ? <RegistrarUsuario username={username} setUsername={setUsername} 
            password = {password} setPassword = {setPassword} setClickButtonRegistrar = {setClickButtonRegistrar}/> :
            <InicioSesion username={username} setUsername={setUsername} 
            password = {password} setPassword = {setPassword} setClickButtonRegistrar = {setClickButtonRegistrar} setIsUserLogin={setIsUserLogin}/>
            }

            <br />
            <BarraBusqueda filterText ={filterText} setFilterText={setFilterText}/>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                {articulosLista.map((articulo)=>(
                    <tr key={articulo.id}>
                        <td>{articulo.nombre}</td>
                        <td>{articulo.precio}</td>
                        <td>{articulo.unidades}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            
        </>
    )
    
}