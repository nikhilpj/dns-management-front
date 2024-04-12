import { useEffect, useState } from "react";
import axios from "axios";
import {Link,useNavigate} from 'react-router-dom'
import { HOSTINGZONETYPES } from "../utils/constants";
import { VPCREGION } from "../utils/constants";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header";



const AddHostingZone = () => {
    const [domainName,setDomainName] = useState('')
    const [type,setType] = useState('')
    const [vpcid,setVpcId]= useState('')
    const [vpcRegion,setVpcRegion] = useState('')
    const [comment,setComment] = useState('')
  
  
  const navigate= useNavigate()
  const token = localStorage.getItem('token');

  useEffect(()=>{
    if(type==='PUBLIC')
    {
      setVpcId('')
      setVpcRegion('')
    }
  },[type])


  async function add(e) {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "https://dns-management-back.onrender.com/user/addhostingzone",
        data: {
          domainName:domainName,
          type:type,
          vpcid:vpcid,
          vpcRegion:vpcRegion,
          comment:comment
         
        },
        headers:{
          'Authorization': `Bearer ${token}`
        }
        
      });
      console.log(response)
      if(response.status==200)
      {
        toast('hosting zone created')
        
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
          onSubmit={add}
          className="w-72 md:w-96 lg:w-96  mx-auto left-0 right-0  rounded-lg p-12 my-24 border-2 border-black"
        >
          <h1 className="font-bold text-3xl py-2">Add HostingZone</h1>
          <input
            type="text"
            placeholder="Enter Domain name"
            className="p-2 my-2 w-full border-2 border-gray-400"
            onChange={(e)=>setDomainName(e.target.value)}
          ></input>
          <br></br>
          <select onChange={(e)=>setType(e.target.value)} className="w-full p-2 my-2 border-gray-400 border-2" >
            <option value={HOSTINGZONETYPES[0]}>choose type of HostingZone</option>
            {HOSTINGZONETYPES?HOSTINGZONETYPES.map((item,index)=><option key={index}> {item}</option>):''}
          </select>
         
          <br></br>
          {type==='PRIVATE'?<><input
            type="text"
            placeholder="Enter vpc id"
            className="p-2 my-2 w-full border-2 border-gray-400"
            onChange={(e)=>setVpcId(e.target.value)}
          ></input>
          <br></br>
          
          <select onChange={(e)=>setVpcRegion(e.target.value)} className="w-full p-2 my-2 border-gray-400 border-2" >
            <option >choose vpc region</option>
            {VPCREGION?VPCREGION.map((item,index)=><option key={index}> {item}</option>):''}
          </select>
          <br></br>
          <input
            type="text"
            placeholder="Enter comment"
            className="p-2 my-2 w-full border-2 border-gray-400"
            onChange={(e)=>setComment(e.target.value)}
          ></input>
          
          </>:''}
          

          <br></br>
          <button type="submit" className="p-2 my-4 bg-gray-400 rounded-lg">
            Submit
          </button>
         
        </form>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default AddHostingZone;
