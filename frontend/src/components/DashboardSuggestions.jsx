import { useState } from "react"
import { useEffect } from "react";
import axios from "axios"
import RenderUser from "./RenderUser";

function DashboardSuggestions() {
    const [suggestions, setSuggestions] = useState([])

    //backend call to get random 5 entries
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/api/v1/user/suggestion`);
           
            if (response.data.message === "Internal Server Error") {
                console.log(`error while suggestion backend call`);
            } else {
                setSuggestions(response.data.suggestedUsers);
            }
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
        fetchUsers();
      }, []);

  return (
    <>
    <div className="font-bold text-large mt-16 mb-5">People You May Know</div>
    <div>{suggestions.length > 0 ? suggestions.map(suggestion => <RenderUser key={suggestion._id} label={suggestion} />) : <div>Internal Server Error</div>}</div>
    </>
  )
}

export default DashboardSuggestions