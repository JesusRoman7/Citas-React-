import { useEffect } from "react";
import Paciente from "./Paciente"

function ListadoPacientes({pacientes, setPaciente, eliminarPaciente}) { /* extraemos el prop de pacientes de App.jsx */
  console.log(pacientes); /* ya tenemos este arreglo en este componente */

  //Usando el useEffect para cuando se agregue un nuevo paciente, se dispare el codigo de abajo
  useEffect(()=>{
    if(pacientes.length > 0){
      console.log('Nuevo Paciente');
    }
  },[pacientes])

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">

        {pacientes && pacientes.length ? ( /* abrimos los parentesis para darle la conidicion si hay pacientes y tiene length */   
          <> {/* hay que recordar que siempre debemos poner el FRAGMENT */}
            <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>

            <p className="text-xl mt-5 mb-10 text-center"> 
                Administra tus {''} {/* para que haga un espacio */}
                <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
            </p>

            {/* el codigo de abajo lo que hace es que ITERA POR CADA PACIENTE QUE TENGAMOS EN EL ARRAY */}
            {pacientes.map((paciente)=>{ /* siempre se recomienda usar el map y no el forEach
            ahora bien, necesitamos el index o un ID para que en cada iteracion, eso que se cree sea UNICO, para esto nos sirve el index/ID
            y apoyado con el KEY en los valores para darle forma, NOTA: MAP LO QUE NOS GENERA ES UNA LISTA(ASI APARECE EN REACT) */
              return <Paciente
                key={paciente.id} /* accedemos al ID para deshacernos de ese error del key que debe ser unico x cada elemento */
                paciente={paciente}
                setPaciente={setPaciente} /* este viene de App, nos servira para EDITAR */
                eliminarPaciente={eliminarPaciente} /* para eliminar */
              />
        
            })}
          </>
          ): ( /* de otra manera abre parentesis si no cumple con esa condicon */
            <> {/* agregando el FRAGMENT */}
              <h2 className="font-black text-3xl text-center">No Hay Pacientes</h2>

              <p className="text-xl mt-5 mb-10 text-center"> 
                  Comienza agregando pacientes {''} {/* para que haga un espacio */}
                  <span className="text-indigo-600 font-bold">y apareceran aqui</span>
              </p>
            </>
          )}


    </div>
  )
}

export default ListadoPacientes