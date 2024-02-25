import URL_SERVER from "../../url";
export default function RegistrarUsuario({username, setUsername, password, setPassword, setClickButtonRegistrar}) {
    
    function validarUsername(){
        const username = document.getElementById("username");

        if(username.value.length <= 3){
            document.getElementById("mensajesError").innerText="Demasiado corto";
            return false;
        }else{
            document.getElementById("mensajesError").innerText="";
            return true;
        }
    }

    function validarPassword(){
        const password = document.getElementById("password");
        let patron = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        if (!patron.test(password.value)) { 
            document.getElementById("mensajesError").innerText="No tiene o una may, una min o un numero";
            return false;
        }else{
            document.getElementById("mensajesError").innerText="";
            return true;
        }
    }

    function registrarUsuario() {
        const username2 = document.getElementById("username");
        const password2 = document.getElementById("password");

        if (!validarUsername()) {
            username2.focus();
        }else if(!validarPassword()){
            password2.focus();
        }else{
            fetch(URL_SERVER+"usuarios",{
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                  "Content-Type": "application/json",
                },
            })
            .then(response => {
            if (response.ok)
                return response.json();
            throw new Error(response.json());
            })
            .catch(err => {
            console.error("ERROR: ", err.message)
            });

            setClickButtonRegistrar(false)
        }
        
    }
    return(
    <>
        <fieldset>
            <legend>Registrar Usuario</legend>
            <span id="datosLogin">
                Username: <input type="text" id="username" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                Password: <input type="password" id="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </span>
            <span id="mensajesError"></span>
            <br/>
            <br/>
            <button onClick={()=>registrarUsuario()}>Registrar Usuario</button>
            
        </fieldset>
    </>
    )
    
}