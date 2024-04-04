import { useState } from "react";
import axios from "axios";
import {Link,useNavigate,useParams} from 'react-router-dom'
import { RECORDTYPES } from "../utils/constants";



const EditRecord = () => {
    const { encodedRecord } = useParams();
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
        url: "http://localhost:5000/user/edit",
        data: {
          name:'nikhilpj.tech',
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
          onSubmit={edit}
          className="w-4/12  mx-auto left-0 right-0  rounded-lg p-12 my-24 border-2 border-black"
        >
          <h1 className="font-bold text-3xl py-2">Edit Record</h1>
          <input
            type="text"
            placeholder="Record Name"
            className="p-2 my-2 w-full border-2 border-gray-400"
            value='nikhilpj.tech'
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
      </div>
    </div>
  );
};

export default EditRecord;
