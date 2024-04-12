import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const Register = () => {
    const [name,setName] = useState('')
    const [nameErr,setNameErr] = useState('')
  const [email, setEmail] = useState("");
  const [emailErr,setEmailErr] = useState('')
  const [phone,setPhone] = useState('')
  const [phoneErr,setPhoneErr] = useState('')
  const [password, setPassword] = useState("");
  const [passwordErr,setPasswordErr] = useState('')
  const navigate=useNavigate()

  async function register(e) {
    e.preventDefault();
    try {
      if(nameErr || emailErr || phoneErr || passwordErr)
      {
        return
      }
      const response = await axios({
        method: "post",
        url: "https://dns-management-back.onrender.com/user/register",
        data: {
            name:name,
          email: email,
          phone:phone,
          password: password,
        },
      });
      console.log('response after register',response)
      let token = response.data.token
      localStorage.setItem("token", token);
      if(response.status===200)
      {
        navigate('/main')
      }
    } catch (error) {
      console.log("error is ", error.message);
      toast('registration unsuccessful')
    }
  }

  const isPhoneValid=(phone)=>{
    const phonePattern = /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/
    return phonePattern.test(phone)
  }

  const isNameValid=(name)=>{
    const namePattern = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/
    return namePattern.test(name)

  }

  const IsEmailValid=(email)=>{
    const  emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email)
  }

  const isPasswordValid=(password)=>{
    const passwordPattern = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
    return passwordPattern.test(password)
  }

  return (
    <div>
      <div className="form">
        <form
          onSubmit={register}
          className="w-64 md:w-80 lg:w-96  mx-auto left-0 right-0 border-2 border-black rounded-lg p-12 my-20  "
        >
          <h1 className="font-bold text-3xl py-2 ">Register</h1>
          <input
            type="text"
            placeholder="name"
            className="p-2 my-2 w-full border-gray-400 border-2"
            onChange={(e) =>{ setName(e.target.value)
              if(!isNameValid(e.target.value))
              {
                setNameErr('invalid name')
              }
              else
              {
                setNameErr('')
              }
          }}
          ></input>
          {nameErr?<p className="text-red-700">{nameErr}</p>:''}
          <br></br>
          <input
            type="text"
            placeholder="Email"
            className="p-2 my-2 w-full border-gray-400 border-2"
            onChange={(e) => {setEmail(e.target.value)
            if(!IsEmailValid(e.target.value))
          {
            setEmailErr('invalid Email')
            
          }
        else{
          setEmailErr('')
        }}}
          ></input>
          {emailErr?<p className="text-red-700">{emailErr}</p>:''}
          <br></br>
          <input
            type="text"
            placeholder="Phone"
            className="p-2 my-2 w-full border-gray-400 border-2"
            onChange={(e) => {setPhone(e.target.value)
            if(!isPhoneValid(e.target.value))
          {
            setPhoneErr('invalid phone number')
          }
        else{
          setPhoneErr('')
        }}}
          ></input>
          {phoneErr?<p className="text-red-700">{phoneErr}</p>:''}
          <br></br>
          <input
            type="text"
            placeholder="password"
            className="p-2 my-2 w-full border-gray-400 border-2"
            onChange={(e) => {setPassword(e.target.value)
            if(!isPasswordValid(e.target.value))
          {
            setPasswordErr('minimum 6 character, 1 upperCase, 1 lowerCase , 1 special character,1 number')
          }
        else
      {
        setPasswordErr('')
      }}}
          ></input>
          {passwordErr?<p className="text-red-700">{passwordErr}</p>:''}
          <button type="submit" className="p-2 my-4 bg-gray-400 rounded-lg">
            Submit
          </button>
          <p className="cursor-pointer"><Link to='/'>Already have an account? Login</Link></p>
        </form>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default Register;
