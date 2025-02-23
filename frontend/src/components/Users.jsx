import { useEffect, useState } from "react"
import axios from "axios"
import useDebounce from "../hooks/UseDebounce"
import UserNotFound from "./UserNotFound"
import DashboardSuggestions from "./DashboardSuggestions"
import RenderUser from "./RenderUser"

export default function Users() {
  const [users, setUsers] = useState([])
  const [filter, setFilter]= useState("")
  const [userFound, setUserFound] = useState(null)

  const debouncedFilter= useDebounce(filter, 500);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${debouncedFilter}`);
       
        if (response.data.message === "No user found") {
          setUserFound(false);
          setUsers([]);
        } else {
          setUserFound(true);
          setUsers(response.data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if(debouncedFilter) fetchUsers();
    else {
      setUserFound(null);
      setUsers([]);
    }

  }, [debouncedFilter]);

  return (
    <div className="px-4 sm:px-14 my-4">
        <div className="font-bold text-lg mt-10">Search your friends ...</div>
        <div className="my-2">
            <input type="text" placeholder="Search Users..." className="border rounded border-gray-400 shadow-md px-2 py-1 w-full h-10"
            onChange={(e)=>{setFilter(e.target.value)}}/>
        </div>
        <div className="">
            {users.length > 0 ? users.map(user => <RenderUser key={user._id} label={user} />) : (debouncedFilter && userFound === false) && <UserNotFound />}
            {!debouncedFilter && userFound===null && <DashboardSuggestions />}
        </div>
    </div>
  )
}

