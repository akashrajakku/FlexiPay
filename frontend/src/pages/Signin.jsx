import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Logo from "../resources/logo.png"
import signin1 from '../resources/signin1.jpg'
import { useNavigate } from 'react-router-dom';


const Signin = () => {
  const navigate= useNavigate();
  const handleLogoClick = () =>{
      navigate('/');
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
          <InputBox label="Email" placeholder="enter e-mail" />
          <InputBox label="Password" placeholder="password"/>
          <Button label="Log In" className="mt-4 w-full"/>
          <BottomWarning label="Didn't have an account?" buttonText="Signup" to="/signup" />
      </div>
      </div>
    </div>    
    </div>
  )
}

export default Signin