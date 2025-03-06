import { useState, useContext } from "react";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import logo from '../resources/logo.png';

export default function Appbar() {
  const { user, setUser } = useContext(UserContext); 
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogoClick = () =>{
    navigate('/');
  }

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick= () =>{
    navigate('/myprofile');
  };

  const handleLogout=()=>{
      localStorage.removeItem("token");
      setUser(null);
      navigate('/signin');
  }

  return (
    <div className="w-full relative flex justify-between items-center shadow px-4 sm:px-8 md:px-14 py-2">
      <img src={logo} alt="logo" className="w-36 md:w-40 mb-4 cursor-pointer md:mb-0" onClick={handleLogoClick}/>

      <div className="flex items-center relative">
        <div className="text-sm sm:text-base md:text-lg">Hello, {user?.firstName}</div>

        <div className="relative ml-2">
          <div
            className="rounded-full h-10 w-10 sm:h-12 sm:w-12 flex justify-center items-center cursor-pointer bg-slate-300"
            onClick={handleClick}
          >
            <img
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${user?.firstName}`}
              className="h-[90%] w-[90%] rounded-full"
              alt="User Avatar"
            />
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-32 sm:w-40 text-sm sm:text-base">
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center" onClick={handleProfileClick}>
                <FiUser className="mr-2" /> My Profile
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center" onClick={handleLogout}>
                <FiLogOut className="mr-2"/> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
