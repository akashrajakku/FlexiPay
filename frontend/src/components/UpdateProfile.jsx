import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";  // Import UserContext

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function UpdateProfile({ onClose, setUser }) {
  const { user } = useContext(UserContext);  // Get user from context

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value.trim() !== "")
    );
    

    if (Object.keys(filteredData).length === 0) {
      setError("Please enter at least one field to update.");
      return;
    }

    if(Object.keys(filteredData.password) && Object.keys(filteredData.password).length < 6){
      setError("Password should be at least 6 characters");
      return;
    }

    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/api/v1/user/update`,
        filteredData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage("Profile updated successfully!");

      // Fetch updated user info
      const updatedUser = await axios.get(`${API_BASE_URL}/api/v1/user/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser((prevUser) => ({
        ...prevUser, 
        ...updatedUser.data,
      }));
      
      onClose(); // Close modal after update

    } catch (err) {
      setError(err.response?.data?.message || "Internal server error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">Update Your Profile</h2>
        {message && <p className="text-green-600 pb-2">{message}</p>}
        {error && <p className="text-red-600 pb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Minimum 6 characters"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
