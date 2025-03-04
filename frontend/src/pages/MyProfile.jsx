import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSuggestions from "../components/DashboardSuggestions";
import Footer from "../components/Footer";
import UpdateProfile from "../components/UpdateProfile";
import { UserContext } from "../context/UserContext"; 

export default function MyProfile() {
  const { user, setUser } = useContext(UserContext); 
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate();
  //console.log(user);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate('/signin');
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full p-6 md:p-12 relative">
        <button className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={handleLogout}>
          Logout
        </button>
        <div className="w-full md:w-1/3 flex flex-col items-center text-center p-4">
          <div className="h-32 w-32 md:h-40 md:w-40 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold">
            <img
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${user?.firstName}`}
              alt="Profile"
              className="h-full w-full rounded-full"
            />
          </div>
          <h2 className="mt-4 text-xl font-semibold">{user?.firstName}</h2>
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => setShowUpdateModal(true)}
          >
            Update Your Profile
          </button>
        </div>

        {/* Right Side - Balance and Friends List */}
        <div className="w-full md:w-2/3 p-4">
          <div className="flex flex-col items-center justify-center text-center h-40 w-full">
            <h3 className="text-lg font-semibold">Your Current Balance</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">Rs. {user?.balance ?? 0}</p>
          </div>
          <DashboardSuggestions label="Your Close Friends" />
        </div>
      </div>

      {showUpdateModal && (
        <UpdateProfile onClose={() => setShowUpdateModal(false)} setUser={setUser} />
      )}

      <Footer />
    </>
  );
}
