import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Logo from "../resources/logo.png"


const Signin = () => {
  return (
    <div className="bg-blue-200 h-screen flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center pt-10 pb-10">
      <div className="pb-5">
        <img src={Logo} className="w-40"/>
      </div>
    
      <div className="bg-blue-50 rounded-lg w-[80%] sm:w-[50%] lg:w-[23%] text-center p-3 shadow-md">
        <div className="flex flex-col">
          <Heading label="Login"/>
          <SubHeading label="Enter your credentials"/>
          <InputBox label="Email" placeholder="enter e-mail" />
          <InputBox label="Password" placeholder="password"/>
          <Button label="Log In" className="mt-4"/>
          <BottomWarning label="Didn't have an account?" buttonText="Signup" to="/signup" />
      </div>
    </div>
      </div>
      
    </div>
  )
}

export default Signin