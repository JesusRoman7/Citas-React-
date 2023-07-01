import {useState, useEffect} from 'react';
import Error from './Error'
function Formulario({pacientes, setPacientes, paciente, setPaciente}) { /* a la funcion formulario se le llama componente */
    const [nombre, setNombre] = useState(''); /* useState nos retorna una variable(nombre) y una funcion modificadora (setNombre) */
    /* si quieres cambiar el nombre, usa la funcion setNombre */
    /* estos states son locales de formulario */
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false); /* añadiendo otro state con valor de inicio false para mostrar un error */

    //Con el useEffect nos evitamos tener varios RENDERS innecesarios, entonces con el codigo de abajo le decimos
    //ejecutate solamente cuando paciente cambie, ya no tendremos RENDER por doquier
    useEffect(() =>{
        console.log(paciente); /* en teoria nos imprimiria el objeto */
        if(Object.keys(paciente).length > 0){ /* paciente es el objeto actual, el que esta en memoria */
            setNombre(paciente.nombre) /* modifica los datos con los datos cuando presionamos en editar*/
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    }, [paciente]) /* lee cuando hay cambios en el obj de paciente */

    //Generando el Id
    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);

        return random + fecha;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validacion del Formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            // console.log('Hay al menos un campo vacio');
            setError(true); //muestrame el mensaje de error en el HTML
            return;
        }
        // else{
        //     console.log('Todos llenos');
        // }
        setError(false); //regresandolo a true para que se oculte el mensaje de error cuando ya tenemos todos los campos llenos

        //Construyendo el Objeto de Paciente para irlo agregando al arreglo de setPacientes
        const objetoPaciente = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas
        }

        //Si existe en el objeto de paciente un id 
        if(paciente.id){//eso significa que estamos editando
            console.log('editando'); /* al darle click a editar paciente nos ejecuta este codigo */
            //Editando el registro
            objetoPaciente.id = paciente.id /* el id que tenemos en paciente, se lo asignamos al objectoPaciente, ya que no tiene uno */
            //en si el paciente si lo tiene cuando damos click a editar pero el objetoPaciente no
            //Conclusion, paciente sera como la version anterior(cuando presionamos editar) y objetoPaciente la version actualizada
            //(cuando damos click a editar paciente)

            const pacientesActualizados = pacientes.map(pacienteState => {
                return pacienteState.id === paciente.id ? objetoPaciente : pacienteState
            })

            setPacientes(pacientesActualizados);
            setPaciente({}) //lo regresamos a un objeto, el state que aparece en App en el react dev tools, para limpiarlo en memoria

        }else{
            console.log('Nuevo Registro'); //cuando se crea un nuevo registro y le damos click a agregar paciente, ejecuta este codigo
            //Se esta creando un nuevo registro
            objetoPaciente.id = generarId() /* aqui agregamos un ID al objeto antes de mandarlo al state setPacientes */
            setPacientes([...pacientes, objetoPaciente]);
        }
        // setPacientes(propietario);
        //como antes mencionamos, setPacientes es la modificadora, entonces va a modificar pacientes, pacientes sera nuestro array 
        //de objetos, entonces cada que agregyemos un nuevo objetoPaciente, tendremos que traernos una copia de pacientes con el spread
        // setPacientes([...pacientes, objetoPaciente]); se movio para arriba en el else

        //Reiniciando el Formulario
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }

    return (
        <div className="md:w-1/2 lg:w-2/5">
                <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

                <p className="text-lg mt-5 text-center mb-10">
                    Añade Pacientes y {''}
                    <span className="text-indigo-600 font-bold">Administralos</span>
                </p>

                <form onSubmit={handleSubmit} action="" className="bg-white shadow-md rounded-lg py-10 px-5">
                    {/* colocando el mensaje de error cuando es TRUE en setError */}
                    {error && <Error><p>Todos los campos son Obligatorios</p></Error>}
                        {/* // <div className='bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded'>
                        //     <p>Todos los campos son obligatorios</p> {/* Si error es TRUE entonces imprime eso JUNTO CON UN DIV Y UN P */}
                        {/* // </div> */} 
                    <div className="mb-5">
                        <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
                        <input id="mascota" type="text" 
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e)=> setNombre(e.target.value)} /* cada que este evento vaya cambiando, ese useState va a ir reescribiendo el nombre*/
                        /* onChange es parte de los eventos de React */
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
                        <input id="propietario" type="text" 
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={(e)=> setPropietario(e.target.value)}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
                        <input id="email" type="email" 
                        placeholder="Email Contacto Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="atla" className="block text-gray-700 uppercase font-bold">Alta</label>
                        <input id="atla" type="date" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={(e)=> setFecha(e.target.value)}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
                        <textarea name="" id="sintomas" cols="30" rows="10" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Describe los Sintomas"
                            value={sintomas}
                            onChange={(e)=> setSintomas(e.target.value)}>
                        </textarea>
                    </div>

                    <input type="submit" 
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                    /* el codigo de abajo lo que hara es que cuando estamos creando el objeto por primera vez, puesto que no tenemos un ID,
                    pero al darle editar el objeto ya cuenta con ID, aqui comprobamos si paciente.id es TRUE entonces es editar paciente como texto en el HTML, de otra manera es Agregar Paciente, esto se logra a que ya tenemos una instancia arriba de 'paciente', CONCLUSION cambiara el texto de agregar paciente/editar segun si tiene ID el objeto */
                    value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
                    />
                </form>
        </div>
    )
}

export default Formulario