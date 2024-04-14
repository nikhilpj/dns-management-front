import { useNavigate } from "react-router-dom";



const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-600 p-4   w-full flex justify-between h-14 text-xl font-bold">
      <button className="text-white " onClick={()=>navigate('/main')}>Home</button>
      <button className="text-white " onClick={()=>{navigate('/')
    localStorage.removeItem('token')}}>logout</button>
    </div>
  );
};

export default Header;
