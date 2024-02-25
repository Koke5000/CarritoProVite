import URL_SERVER from "../../url";
export default function TablaArticulos({articulosLista, setPintaArticulos,setPintarCesta}){

    const username = JSON.parse(localStorage.getItem("usuarioIniciado"));


    function agregarArticulo(articulo) {
        if (articulo.unidades <= 0) {
            alert("No puedes comprar un artículo si no hay stock");
        } else {
            // Consulta si el artículo ya está en la cesta
            fetch(URL_SERVER + `cesta?nombre=${articulo.nombre}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error(response.status);
                })
                .then(data => {
                    if (data.length === 1) {
                        // Si el artículo ya está en la cesta, actualiza las unidades en la cesta
                        fetch(URL_SERVER + "cesta/" + data[0].id, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                unidades: data[0].unidades + 1, // Incrementa las unidades en 1
                            }),
                        })
                        .then(response => {
                            if (response.ok) {
                                setPintaArticulos(true);
                                return response.json();
                            }
                            throw new Error(response.status);
                        })
                        .catch(err => {
                            console.error("ERROR: ", err.message);
                        });
                    } else {
                        // Si el artículo no está en la cesta, añádelo a la cesta
                        fetch(URL_SERVER + "cesta", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                nombre: articulo.nombre,
                                precio: articulo.precio,
                                unidades: 1, // Añade el artículo con 1 unidad
                                username:username[0].username
                            }),
                        })
                        .then(response => {
                            if (response.ok) {
                                setPintaArticulos(true);
                                return response.json();
                            }
                            throw new Error(response.status);
                        })
                        .catch(err => {
                            console.error("ERROR: ", err.message);
                        });
                    }
                    setPintarCesta(true);
                })
                .catch(err => {
                    console.error("ERROR: ", err.message);
                });
    
            // Actualiza el número de unidades del artículo en la tienda
            fetch(URL_SERVER + "articulos/" + articulo.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    unidades: articulo.unidades - 1, // Reduce las unidades en 1
                }),
            })
            .then(response => {
                if (response.ok) {
                    setPintaArticulos(true);
                    return response.json();
                }
                throw new Error(response.status);
            })
            .catch(err => {
                console.error("ERROR: ", err.message);
            });
        }
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {articulosLista.map(articulo => (
                    <tr key={articulo.id}>
                        <td>{articulo.nombre}</td>
                        <td>{articulo.precio}</td>
                        <td>{articulo.unidades}</td>
                        <td><button onClick={()=>agregarArticulo(articulo)}>Comprar</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )
}