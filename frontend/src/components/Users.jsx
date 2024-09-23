import Button from "./Button"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import useDebounce from "../hooks/UseDebounce"

export default function Users() {
  const [users, setUsers] = useState([])
  const [filter, setFilter]= useState("")

  const debouncedFilter= useDebounce(filter, 500);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${debouncedFilter}`);
       
        if (response.data.message === "No user found") {
          setUsers([]);
        } else {
          setUsers(response.data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if(debouncedFilter) fetchUsers();
  }, [debouncedFilter]);

  return (
    <div className="px-4 sm:px-14 my-4">
        <div className="font-bold text-lg">Users</div>
        <div className="my-2">
            <input type="text" placeholder="Search Users..." className="border rounded border-gray-400 shadow-md px-2 py-1 w-full h-10"
            onChange={(e)=>{setFilter(e.target.value)}}/>
        </div>
        <div>
            {users.map(user => <User key={user._id} label={user}/>)}
        </div>
    </div>
  )
}

function User({label}){
  const navigate = useNavigate();
    return(
        <div className="w-full flex justify-between border-2">
        <div className="flex justify-center items-center">
        <div className="rounded-full h-10 w-10 flex justify-center items-center bg-slate-300">
          {<img
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${label.firstName}`}
            className="h-[90%] w-[90%] rounded-full"
          />}
        </div>
            <div className="font-semibold text-sm ml-2">
                {label.firstName + " " + label.lastName}
            </div>
        </div>

        <div>
            <Button onClick={(e)=>{navigate(`/send?id=${label._id}&name=${label.firstName}`)}} label={"Send Money"} className="mt-2"/>
        </div>
    </div>
    )
    
}

