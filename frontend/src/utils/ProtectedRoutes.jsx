import { useState, useEffect} from "react"
import axios from "axios"
import {Navigate, Outlet} from "react-router-dom"


function ProtectedRoutes() {
    const [isValid, setIsValid] = useState(null)
    const [userFirstName, setUserFirstName] = useState(null)
    const [userBalance, setUserBalance] = useState(null)
    const [userId, setUserId] = useState(null)
    
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
                setUserFirstName(response.data.firstName);
                setUserId(response.data.userId);
                setIsValid(true);
              } catch (error) {
                setIsValid(false);
                localStorage.removeItem("token");
              }
            }
        validateToken();
    }, [token])

    useEffect(() => {
        const getUserBalance = async() => {        
              try {
                const response =  await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers:{
                        Authorization:`Bearer ${token}`,
                    }
                });
                setUserBalance(response.data.balance);
              } catch (error) {
                console.log(`error from getUserBalance : ${error}`);
                setIsValid(false);
              }

            }
        getUserBalance();
    }, [token, userId])

    if(isValid === null){
        return <p>Loading...</p>
    }

    return isValid ? <Outlet context={{ firstName: userFirstName, balance: userBalance }} /> : <Navigate to="/signin" replace />;

}

export default ProtectedRoutes