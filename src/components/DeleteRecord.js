import { useParams ,useNavigate} from "react-router-dom";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header";

const DeleteRecord=()=>{
    const navigate = useNavigate('')
    const { encodedRecord,name } = useParams();
    const record = JSON.parse(decodeURIComponent(encodedRecord));
    const token = localStorage.getItem('token');
  
    

    const deletion=async(e)=>{

        e.preventDefault();
        try {
          const response = await axios({
            method: "post",
            url: "https://dns-management-back.onrender.com/user/delete",
            data: {
              name:name,
              recordType:record.Type,
              value:record.ResourceRecords,
              ttl:record.TTL
            },
            headers:{
              'Authorization': `Bearer ${token}`
            }
            
          });
          console.log(response)
          if(response.status==200)
          {
            toast('record deleted successfully')
          }
          
        } catch (error) {
          console.log("error is ", e);
          if(error?.response?.status===401)
          {
            navigate('/')
          }
          else if(error?.response?.status===500)
          {
            toast('internal server error')
          }
        }
    }
  
    return (
        <div>
          <Header/>
        <div className="form">
          <form
            onSubmit={deletion}
            className="w-72 md:w-80 lg:w-96 mx-auto left-0 right-0  rounded-lg p-12 my-24 border-2 border-black"
          >
            <h1 className="font-bold text-3xl py-2">Delete Record</h1>
            <input
              type="text"
              
              className="p-2 my-2 w-full border-2 border-gray-400"
              value={name}
            ></input>
            <br></br>
            <input
              type="text"
              
              className="p-2 my-2 w-full border-2 border-gray-400"
              value={record.Type}
            ></input>
            <br></br>
            <input type="text" className="w-full p-2 my-2 border-gray-400 border-2" value={record.ResourceRecords.map((item)=>item.Value)}></input>
            <br></br>
            <input type="text" className="w-full p-2 my-2 border-gray-400 border-2" value={record.TTL} ></input>
            <br></br>
            <button type="submit" className="p-2 my-4 bg-gray-400 rounded-lg">
              Delete
            </button>
           
          </form>
          <ToastContainer/>
        </div>
      </div>
    );
    
  };



export default DeleteRecord