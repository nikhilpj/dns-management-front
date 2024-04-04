import { useParams ,useNavigate} from "react-router-dom";
import axios from "axios";


const DeleteRecord=()=>{
    const navigate = useNavigate('')
    const { encodedRecord } = useParams();
    const record = JSON.parse(decodeURIComponent(encodedRecord));
    const token = localStorage.getItem('token');
  
    

    const deletion=async(e)=>{

        e.preventDefault();
        try {
          const response = await axios({
            method: "post",
            url: "http://localhost:5000/user/delete",
            data: {
              name:'nikhilpj.tech',
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
            navigate('/dashboard')
          }
          
        } catch (error) {
          console.log("error is ", e);
          if(error?.response?.status===401)
          {
            navigate('/')
          }
        }
    }
  
    return (
        <div>
        <div className="form">
          <form
            onSubmit={deletion}
            className="w-4/12  mx-auto left-0 right-0  rounded-lg p-12 my-24 border-2 border-black"
          >
            <h1 className="font-bold text-3xl py-2">Delete Record</h1>
            <input
              type="text"
              
              className="p-2 my-2 w-full border-2 border-gray-400"
              value='nikhilpj.tech'
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
        </div>
      </div>
    );
    
  };



export default DeleteRecord