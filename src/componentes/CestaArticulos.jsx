import URL_SERVER from "../../url";
export default function CestaArticulos({articulosCesta, setPintaArticulos, setPintarCesta}){

    const total = articulosCesta.reduce((acc, articulo) => acc + articulo.precio*articulo.unidades, 0);
    function devolverArticuloCesta(articulo){
        //------------------------------------------------------------------------//
        if (articulo.unidades-1 <= 0) {
            fetch(URL_SERVER + "cesta/" + articulo.id, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .catch(err => {
                console.error("ERROR: ", err.message);
            });
        } else {
            fetch(URL_SERVER+"cesta/"+articulo.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    unidades: articulo.unidades - 1,
                }),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .catch(err => {
                console.error("ERROR: ", err.message);
            });
        }
        
        //------------------------------------------------------------------------//
        fetch(URL_SERVER + `articulos?nombre=${articulo.nombre}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.status);
        })
        .then(data => {
            if (data.length === 1) {
                fetch(URL_SERVER+`articulos/`+data[0].id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        unidades: data[0].unidades + 1,
                    }),
                })
                .then(response => {
                if (response.ok){
                    setPintaArticulos(true);
                    setPintarCesta(true);
                    return response.json();
                }
                throw new Error(response.status);
                })
                .catch(err => {
                console.error("ERROR: ", err.message)
                });
            }})
        .catch(err => {
            console.error("ERROR: ", err.message);
        });
    }

    return (
        <div>
            <h2>Cesta:</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {articulosCesta.map((articulo) => (
                        <tr key={articulo.id}>
                            <td>{articulo.nombre}</td>
                            <td>{articulo.precio}</td>
                            <td>{articulo.unidades}</td>
                            <td><button onClick={()=>devolverArticuloCesta(articulo)}>Devolver</button></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr><td>Total:{total}</td></tr>
                </tfoot>
            </table>
        </div>
      )
}