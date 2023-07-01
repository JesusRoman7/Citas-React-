/* componente es una funcion */

function Header(){ /* esto es el nombre de la funcion del componente */ /* props va como parametro y luego un console.log(props) dentro del prop tenemos la variable numeros, tambien
pudimos ponerla como parametro {numeros} para usar destructuring en el props, y ya solo en el cuerpo de la funcion ponemos console.log
(numeros) */
    /* todos los componentes en JSX requieren UN RETURN */
    // console.log(props); /* nos vamos a la consola para poder ver esas propiedades */
    return(
        <>
            <h1 className="font-black text-5xl text-center md:w-2/3 mx-auto">
                Seguimiento Pacientes  
                <span className="text-indigo-600"> Veterinaria</span>
            </h1>
            
        </>
    )
}

export default Header; /* hay que exportalo para poder usarlo en App.jsx */