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

        const status = response.status;
        if(status === 200){ // everything is okay, success
            const message = response.data.message;
            setLoader(false);
            setSuccessMessage(message);
            setTimeout(() => {
              navigate('/dashboard')
            }, 1500);
        }else{
            setErrorMessage('Server is busy');
        }
      } catch (error) {
        try { // checking for known error
          const message = error.response.message;
          setLoader(false);
          setErrorMessage(message);
        } catch (error) {
          setLoader(false);
          setErrorMessage('An Unexpected Error Occurred');
          console.log(error);
        }
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
      
          {errorMessage && (<div>{errorMessage}</div>)}

          {successMessage && (<div>{successMessage}</div>)}

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