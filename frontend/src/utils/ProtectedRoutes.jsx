import { useState, useEffect} from "react"
import axios from "axios"
import {Navigate, Outlet} from "react-router-dom"


function ProtectedRoutes() {
    const [isValid, setIsValid] = useState(null)
    const token = localStorage.getItem("token");

    useEffect(() => {
        const validateToken = async() => {
            if(!token){
                setIsValid(false);
                return;
              }
        
              try {
                const response =  await axios.get("http://localhost:3000/api/v1/auth/validate", {
                    headers:{
                        Authorization:`Bearer ${token}`,
                    }
                });
                console.log(response);
                setIsValid(true);

              } catch (error) {
                setIsValid(false);
                localStorage.removeItem("token");
              }

            }

        validateToken();
    }, [token])

    if(isValid === null){
        return <p>Loading...</p>
    }

  return isValid?<Outlet />:<Navigate to="/signin" replace />
}

export default ProtectedRoutes