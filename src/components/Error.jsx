
const Error = ({children}) => {
  return (
    <div className='bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded'>
        {children} {/* Si error es TRUE entonces imprime eso JUNTO CON UN DIV Y UN P */}
    </div>
  )
}

export default Error