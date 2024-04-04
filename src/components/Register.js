import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name,setName] = useState('')
  const [email, setEmail] = useState("");
  const [phone,setPhone] = useState('')
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  async function register(e) {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/user/register",
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
        navigate('/dashboard')
      }
    } catch (error) {
      console.log("error is ", e);
    }
  }
  return (
    <div>
      <div className="form">
        <form
          onSubmit={register}
          className="w-4/12  mx-auto left-0 right-0 border-2 border-black rounded-lg p-12 my-32"
        >
          <h1 className="font-bold text-3xl py-2">Register</h1>
          <input
            type="text"
            placeholder="name"
            className="p-2 my-2 w-full border-gray-400 border-2"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <br></br>
          <input
            type="text"
            placeholder="Email"
            className="p-2 my-2 w-full border-gray-400 border-2"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br></br>
          <input
            type="text"
            placeholder="Phone"
            className="p-2 my-2 w-full border-gray-400 border-2"
            onChange={(e) => setPhone(e.target.value)}
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
          <p className="cursor-pointer"><Link to='/'>Already have an account? Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
