import { useState, useEffect } from 'react'; /* agregando el useState */
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListadoPacientes from './components/ListadoPacientes';

function App() {
  /* todo antes del return van las funciones y variables */
  // const [pacientes, setPacientes] = useState([]);
  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? []); /* ultima parte del video */
  const [paciente, setPaciente] = useState({}); /* mandaremos esto a ListadoPacientes, luego de LP a Paciente */

  //Necesitamos un useEffect antes de sincronizar el State
  //Su funcion es OBTENER LO QUE HAYA EN LOCAL STORAGE, si no, dejar el state como el arreglo vacio que le dijimos en la linea 8 
  // useEffect(()=>{
  //   const obtenerLS = () =>{
  //     const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? []; //sino hay nada en LocalStg agregale un []
  //     //el parse nos sirvio para pasarlo de string a un array para que nos funcione bien en el LS
  //     console.log(pacientesLS);
  //     setPacientes(pacientesLS);
  //   }

  //   obtenerLS();//llamando a la funcion una vez que cargue este componente
  // }, []); //cuando se le pasa un arreglo vacio significa que se ejecute 1 sola vez, esto es bueno ya que se ejecutara cuando abramos la pagina por primera vez

  //Agregando en Local Storage
  //Usando useEffect cuando haya cambios en el Storage, ya sease agregar, editar o eliminar, se hara el cambio en LocalStorage
  //SIN EMBARGO, SI DAMOS F5 DESAPARECE NUESTRO HTML SI ES QUE TENEMOS ALGO, para eso usaremos el useEffect de arriba
  //Nota: acorde a los videos primero creamos este use effect luego el de arriba
  useEffect(()=>{
    console.log('Componente Listo o cambio pacientes');
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])

  const eliminarPaciente = id => {
    console.log('eliminando paciente', id);
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id);
    setPacientes(pacientesActualizados);
  }

  /* Estos son los props, lo mandamos llamar en Header y se agregan como parametro para poder usarlos en su archivos respectivamente
  en este caso lo usamos para Header entonces lo ponemos de parametro en el archivo Header.jsx */
  // const imprime2mas2 = () =>{
  //   console.log(2+2);
  // }
  
  return ( /* siempre debe haber un return */
    <>
    {/* {1+1} lo que esta entre llaves lo toma como codigo de JS, entonces nos imprime 2 en la ventana */}
    <div className='container mx-auto mt-20'> {/* en el nivel mas alto solo podemos retornar un elemento */}
      <Header 
      // numeros={1} /* props */
      // fn={imprime2mas2}
      /> {/* importamos nuestro componente proveniente de components/Header */}

      <div className='mt-12 md:flex'>
        <Formulario 
        setPacientes={setPacientes}
        pacientes={pacientes}

        /* pasandole paciente a Formulario para que se llenen los campos */
        paciente={paciente}
        setPaciente={setPaciente} /* lo que modifica la parte del objeto */

        />
        <ListadoPacientes 
        /* pasando via props a este componente */
        pacientes={pacientes}


        /* para editar usamos setPaciente */
        setPaciente={setPaciente}

        //Mandando la funcion de eliminar
        eliminarPaciente={eliminarPaciente}
        />
      </div>


    </div>
    </>
  )
}

export default App
