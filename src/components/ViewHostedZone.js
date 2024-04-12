import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

const ViewHostingZone = () => {
  const [hostingZoneId, setHostingZoneId] = useState("");
  const [zoneDetails, setZoneDetails] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function view(e) {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "https://dns-management-back.onrender.com/user/viewhostingzone",
        data: {
          hostingZoneId: hostingZoneId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setZoneDetails(response.data.data);
      console.log(zoneDetails);
      if (response.status == 200) {
        // navigate("/dashboard");
      }
    } catch (error) {
      console.log("error is ", e);
      if (error?.response?.status === 401) {
        navigate("/");
      } else if (error?.response?.status === 500) {
        toast("internal server error");
      }
    }
  }

  const handleActions=(id,name)=>{
    const encodedRecord = encodeURIComponent(JSON.stringify({id,name}));
    navigate(`/dashboard/${encodedRecord}`);


  }
  return (
    <div>
      <Header/>
      <div className="form">
        <form
          onSubmit={view}
          className="w-5/6 2xl:w-1/2 md:w-7/12 xl:w-4/12 lg:w-6/12 mx-auto left-0 right-0  rounded-lg p-12 my-10 border-2 border-black"
        >
          <h1 className="font-bold text-3xl py-2">View HostingZone</h1>
          <input
            type="text"
            placeholder="Enter Domain ID"
            className="p-2 my-2 w-full border-2 border-gray-400"
            onChange={(e) => setHostingZoneId(e.target.value)}
          ></input>
          <br></br>

          <button type="submit" className="p-2 my-4 bg-gray-400 rounded-lg">
            Submit
          </button>
        </form>

        {zoneDetails ? (
          <table className=" border-4 border-collapse mx-auto left-0 right-0 w-3/4 ">
            <thead>
              <tr>
                <th className="border-4 py-3 px-6">S.NO</th>
                <th className="border-4 py-3 px-6">NAME</th>

                <th className="border-4 py-3 px-6">RESOURCE RECORDS</th>
                <th className="border-4 py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-4 p-6 m-2">1</td>
                <td className="border-4 p-6 m-2">
                  {zoneDetails.HostedZone.Name}
                </td>

                <td className="border-4 p-6 m-2">
                  {zoneDetails.DelegationSet.NameServers.map((record, idx) => (
                    <div key={idx}>{record}</div>
                  ))}
                </td>

                <td className="border-4 p-6 m-2">
                  <button onClick={() => handleActions(hostingZoneId,zoneDetails.HostedZone.Name)}>Click here</button>
                </td>
              </tr>
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
