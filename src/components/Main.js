import {useNavigate} from 'react-router-dom'
import Header from './Header'

const Main=()=>{
    const navigate=useNavigate()
    return(
      <>
      <Header/>
    <div className="flex justify-center items-center ">
      
    <button onClick={()=>navigate('/addhostingZone')} className="h-32 w-auto bg-black hover:bg-green-700 text-2xl text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline mt-28 " >Add Hosting Zone</button>
    <button onClick={()=>navigate('/view')} className="h-32 w-auto bg-black hover:bg-green-700 text-2xl text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-28">View Existing Hosting Zone</button>
  </div>
  </>)
}
export default Main