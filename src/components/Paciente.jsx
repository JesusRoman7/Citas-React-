const Paciente = ({paciente, setPaciente, eliminarPaciente}) => { /* extrayendo el prop de ListadoPacientes.jsx que se creo en el MAP */
    console.log(paciente); /* imprime en consola cada uno de los pacientes */
    const {nombre, propietario, email, fecha, sintomas, id} = paciente; /* destructuring para el ID es necesario para la funcion de eliminar */
    const handleEliminar = () => {
        console.log('Eliminando...', id);
        const respuesta = confirm('Deseas eliminar este paciente?')
        if(respuesta){
            eliminarPaciente(id)
        }
    }

  return (
    <div className="m-3 bg-white shadow-md px-5 py-10 rounded-xl">
            <p className="font-bold mb-3 text-gray-700 uppercase">
                Nombre: {''}
                <span className="font-normal normal-case">{nombre}</span> {/* inyectando la variable paciente.nombre */}
            </p>

            <p className="font-bold mb-3 text-gray-700 uppercase">
                Propietario: {''}
                <span className="font-normal normal-case">{propietario}</span>
            </p>

            <p className="font-bold mb-3 text-gray-700 uppercase">
                Email: {''}
                <span className="font-normal normal-case">{email}</span>
            </p>

            <p className="font-bold mb-3 text-gray-700 uppercase">
                Fecha Alta: {''}
                <span className="font-normal normal-case">{fecha}</span>
            </p>

            <p className="font-bold mb-3 text-gray-700 uppercase">
                Sintomas: {''}
                <span className="font-normal normal-case">{sintomas}</span>
            </p>
            
            {/* agregando los BUTTONS */}
            <div className="flex justify-between mt-10">
                <button
                type="button"
                className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                onClick={() => {
                    /* cuando demos click llama a setPaciente para EDITAR y pasale el objeto de paciente */
                    setPaciente(paciente);
                }}
                >Editar</button>

                <button
                type="button"
                className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                onClick={/*()=>  eliminarPaciente(id) */ handleEliminar}
                >Eliminar</button>
            </div>
        </div>
  )
}

export default Paciente