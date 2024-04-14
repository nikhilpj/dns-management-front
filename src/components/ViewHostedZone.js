import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

const ViewHostingZone = () => {
  const [hostedZoneName,setHostedZoneName] = useState('')
  const [zoneDetails, setZoneDetails] = useState("");
 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function view() {
    
    try {
      const response = await axios({
        method: "post",
        url: "https://dns-management-back.onrender.com/user/viewhostingzone",
        data: {
          hostingZoneName: 'nikhilpj.tech',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setZoneDetails(response.data.data.HostedZones);
      console.log(zoneDetails);
      if (response.status == 200) {
        // navigate("/dashboard");
      }
    } catch (error) {
      console.log("error is ", error);
      if (error?.response?.status === 401) {
        navigate("/");
      } else if (error?.response?.status === 500) {
        toast("internal server error");
      }
    }
  }
useEffect(()=>{
  view()
},[])

  const handleActions=(id,name)=>{
    const encodedRecord = encodeURIComponent(JSON.stringify({id,name}));
    navigate(`/dashboard/${encodedRecord}`);


  }
  return (
    <div>
      <Header/>
      <div className="form ">
     

        {zoneDetails ? (
          <table className=" border-4 border-collapse mx-auto left-0 right-0  my-8 w-96">
            <thead>
              <tr>
                <th className="border-4 py-3 px-6">S.NO</th>
                <th className="border-4 py-3 px-6">NAME</th>

                <th className="border-4 py-3 px-6">ID</th>
                <th className="border-4 py-3 px-6">TYPE</th>
                <th className="border-4 py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {zoneDetails.map((item,index)=>(
              
              <tr key={index}>
                <td className="border-4 p-6 m-2">{index+1}</td>
                <td className="border-4 p-6 m-2">
                  {item.Name}
                </td>

                <td className="border-4 p-6 m-2">
                  {item.Id.split('/')[2]}
                </td>
                <td className="border-4 p-6 m-2">
                  {item.Config.PrivateZone?'PRIVATE':'PUBLIC'}
                </td>

                <td className="border-4 p-6 m-2">
                  <button onClick={() => handleActions(item.Id.split('/')[2],item.Name)}>Click here</button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        ) : (
          ""
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default ViewHostingZone;
