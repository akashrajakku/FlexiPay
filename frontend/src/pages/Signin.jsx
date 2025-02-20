import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Logo from "../resources/logo.png"
import signin1 from '../resources/signin1.jpg'
import { useNavigate} from 'react-router-dom';
import axios from "axios";
import { useState } from "react"


const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loader, setLoader] = useState(false)

  const navigate= useNavigate();
  const handleLogoClick = () =>{
      navigate('/');
  }

  const handleLoginClick= async(event)=>{
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoader(true);

      try {
        const url="http://localhost:3000/api/v1/user/login";
        const response= await axios.post(url, {
            username: username,
            password: password
        });

        navigate('/dashboard');

      } catch (error) {
        if(error.response){
            const errorData = error.response.data.error;
            const errorType= error.response.data.error.type;
            const message = error.response.data.error.message;

          if(errorData && errorType && message){

              if(errorType === "Incorrect Input"){
                setLoader(false);
                setErrorMessage(message);
              }

              else if(errorType === "Incorrect Username"){
                setLoader(false);
                setErrorMessage(message);
              }

              else if(errorType === "Incorrect Password"){
                setLoader(false);
                setErrorMessage(message);
              }

              else if(errorType === "SYSTEM_ERROR"){
                setLoader(false);
                setErrorMessage(message);
              }

              else{
                setLoader(false);
                setErrorMessage("Unable to connect to the server. Please try again later.");
              }
          }

        }else if(error.request){
          setLoader(false);
          setErrorMessage("Network error. Please check your internet connection.");
        }
        else{
          setLoader(false);
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
        //console.log(error);
      }
  }

  return (
    <div className="h-screen flex flex-col bg-purple-300"> 
      <div className="p-10">
        <img src={Logo} className="w-40 cursor-pointer" onClick={handleLogoClick}/>
      </div>
    <div className="flex justify-center align-middle">
      <div><img src={signin1} alt="sign in" className="object-contain max-h-[500px] max-w-[500px] rounded-l-lg shadow-lg"></img></div>
      <div className="flex justify-center w-[80%] sm:w-[50%] lg:w-[33%] text-center p-3 shadow-lg rounded-r-lg bg-purple-100">
        <div className="flex flex-col">
          <Heading label="Hello Again!"/>
          <SubHeading label="Welcome back you've been missed!"/>
          <InputBox 
            label="Email" 
            placeholder="enter e-mail" 
            value={username}
            onChange={(e)=> setUsername(e.target.value)}/>

          <InputBox 
            label="Password" 
            placeholder="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}/>

          <Button 
            disableFlag={loader} // avoid multiple button press once a single request is sent
            label={loader? "Logging in..." : "Log In"}
            className="mt-4 w-full" 
            onClick={handleLoginClick}/>

          <BottomWarning label="Didn't have an account?" buttonText="Signup" to="/signup" />
          {/*displaying error and successMessage*/}
      
          {errorMessage && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded relative">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errorMessage}
                </p>
              </div>)
          }

          {successMessage && (
                    <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded relative">
                      <p className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {successMessage}
                      </p>
                    </div>)
          }

          {loader && (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          )}

      </div>
      </div>
    </div>    
    </div>
  )
}

export default Signin