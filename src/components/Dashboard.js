import axios from "axios";
import { useEffect, useState } from "react";
import { RECORDTYPES } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setselectedRecord] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getRecords = async () => {
    try {
        const response = await axios({
            method: "get",
            url: "http://localhost:5000/user/records",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response, "response for getting records");
      
          setRecords(response.data.data.ResourceRecordSets);
        
    } catch (error) {

        console.log('error is',error.message)
        if(error?.response?.status===401)
        {
            navigate('/')
        }
        
    }

   
  };
  useEffect(() => {
    getRecords();
  }, []);

  const handleRecordType = (e) => {
    const type = e.target.value;
    setselectedRecord(type);
  };

  const handleDeleteRecord = (record) => {
    const encodedRecord = encodeURIComponent(JSON.stringify(record));
    navigate(`/delete/${encodedRecord}`);
  };

  const handleEditRecord = (record) => {
    const encodedRecord = encodeURIComponent(JSON.stringify(record));
    navigate(`/edit/${encodedRecord}`);
  };

  const filteredRecords = selectedRecord
    ? records.filter((item) => item.Type === selectedRecord)
    : records;
  return (
    <>
      <div className="flex flex-col  justify-center h-full">
        <div>
          <div className="mb-4 flex  justify-between py-2 px-4">
            <select
              className="border-2  border-gray-800 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 block  bg-white"
              onChange={handleRecordType}
            >
              <option className="text-gray-500 " value="">
                All Record Type
              </option>
              {RECORDTYPES
                ? RECORDTYPES.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))
                : ""}
            </select>

            <button
              className="  border-2 bg-gray-100 border-gray-800 rounded-md py-2 px-3   "
              onClick={() => navigate("/add")}
            >
              Add Record
            </button>
          </div>
        </div>
        <table className="min-w-full border-4 border-collapse">
          <thead>
            <tr>
              <th className="border-4 py-3 px-6">S.NO</th>
              <th className="border-4 py-3 px-6">NAME</th>
              <th className="border-4 py-3 px-6">TYPE</th>
              <th className="border-4 py-3 px-6">TTL</th>
              <th className="border-4 py-3 px-6">RESOURCE RECORDS</th>

              <th className="border-4 py-3 px-6">EDIT</th>
              <th className="border-4 py-3 px-6">DELTETE</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((item, index) => (
              <tr key={index}>
                <td className="border-4 p-6 m-2">{index + 1}</td>
                <td className="border-4 p-6 m-2">{item.Name}</td>
                <td className="border-4 p-6 m-2">{item.Type}</td>
                <td className="border-4 p-6 m-2">{item.TTL}</td>
                <td className="border-4 p-6 m-2">
                  {item.ResourceRecords.map((record, idx) => (
                    <div key={idx}>{record.Value}</div>
                  ))}
                </td>

                <td className="border-4 p-6 m-2">
                  <button onClick={() => handleEditRecord(item)}>EDIT</button>
                </td>
                <td className="border-4 p-6 m-2">
                  <button onClick={() => handleDeleteRecord(item)}>
                    DELTETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Dashboard;
