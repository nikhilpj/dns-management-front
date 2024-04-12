import { useState } from "react";
import axios from "axios";
import {Link,useNavigate,useParams} from 'react-router-dom'
import { RECORDTYPES } from "../utils/constants";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header";


const EditRecord = () => {
    const { encodedRecord ,name} = useParams();
    const record = JSON.parse(decodeURIComponent(encodedRecord));
  const [value,setValue] = useState(record.ResourceRecords)
  const [ttl,setTtl] = useState(record.TTL)
  const [recordType,setRecordType] =useState(record.Type)

  
  const navigate= useNavigate()
  const token = localStorage.getItem('token');
 

  const handleValueChange = (index, newValue) => {
    const updatedValue = [...value];
    updatedValue[index] = newValue;
    setValue(updatedValue);
  };

  async function edit(e) {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "https://dns-management-back.onrender.com/user/edit",
        data: {
          name:name,
          recordType:recordType,
          value:value,
          ttl:ttl
        },
        headers:{
          'Authorization': `Bearer ${token}`
        }
        
      });
      console.log(response)
      if(response.status==200)
      {
        toast('record edited successfully')
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
          onSubmit={edit}
          className="w-72 md:w-80 lg:w-96  mx-auto left-0 right-0  rounded-lg p-12 my-24 border-2 border-black"
        >
          <h1 className="font-bold text-3xl py-2">Edit Record</h1>
          <input
            type="text"
            placeholder="Record Name"
            className="p-2 my-2 w-full border-2 border-gray-400"
            value={name}
          ></input>
          <br></br>
          <select onChange={(e)=>setRecordType(e.target.value)} className="w-full p-2 my-2 border-gray-400 border-2" >
            <option value={record.Type}>{record.Type}</option>
            {RECORDTYPES?RECORDTYPES.map((item,index)=><option key={index}> {item}</option>):''}
          </select>
          <br></br>
          {/* <input type="text" className="w-full p-2 my-2 border-gray-400 border-2" value={value.map((item)=>item.Value)} onChange={(e)=>setValue(e.target.value)}></input> */}

          {value.map((item, index) => (
            <input
              key={index}
              type="text"
              className="w-full p-2 my-2 border-gray-400 border-2"
              value={item.Value}
              onChange={(e) => handleValueChange(index, e.target.value)}
            ></input>
          ))}
          <br></br>
          <input type="text" className="w-full p-2 my-2 border-gray-400 border-2" value={ttl} onChange={(e)=>setTtl(e.target.value)}></input>
          <br></br>
          <button type="submit" className="p-2 my-4 bg-gray-400 rounded-lg">
            Edit
          </button>
         
        </form>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default EditRecord;
