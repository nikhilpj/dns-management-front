import { useState } from "react";
import axios from "axios";
import {Link,useNavigate} from 'react-router-dom'
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate()


  async function login(e) {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "https://dns-management-back.onrender.com/user/login",
        data: {
          email: email,
          password: password,
        },
        
      });
      let token = response.data.token
      localStorage.setItem("token", token);
      console.log(response)
      if(response.status==200)
      {
        
        navigate('/main')
      }
    } catch (error) {
      console.log("error is ", e);
      if(error?.response?.status===500)
      {
        toast('login ussuccessfull')
      }
      
    }
  }
  return (
    <div>
      <div className="form">
        <form
          onSubmit={login}
          className="w-64 md:w-80 lg:w-96 mx-auto left-0 right-0  rounded-lg p-12 my-32 border-black border-2 "
        >
          <h1 className="font-bold text-3xl py-2">Login</h1>
          <input
            type="text"
            placeholder="Email"
            className="p-2 my-2 w-full border-gray-400 border-2"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br></br>
          <input
            type="text"
            placeholder="password"
            className="p-2 my-2 w-full border-gray-400 border-2"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit" className="p-2 my-4 bg-gray-400 rounded-lg">
            Submit
          </button>
         <p className="cursor-pointer" ><Link to='/register'>Do not have an account? Sign up here</Link></p>
        </form>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default Login;
