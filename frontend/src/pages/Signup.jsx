import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Logo from "../resources/logo.png"
import { useState } from "react"
import axios from "axios"

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-blue-200 h-screen flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center pt-10 pb-10">
      <div className="pb-5">
        <img src={Logo} className="w-40"/>
      </div>
    
      <div className="bg-blue-50 rounded-lg w-[80%] sm:w-[50%] lg:w-[23%] text-center p-3 shadow-md">
        <div className="flex flex-col">
          <Heading label="Signup"/>
          <SubHeading label="Create an account to continue"/>
          <InputBox onChange={(e)=>{
              setFirstName(e.target.value);
          }} label="First Name" placeholder="Akash" />

          <InputBox onChange={(e)=>{
              setLastName(e.target.value);
          }} label="Last Name" placeholder="Raj" />

          <InputBox onChange={(e)=>{
              setUsername(e.target.value);
          }} label="Email" placeholder="abc@email.com" />

          <InputBox onChange={(e)=>{
              setPassword(e.target.value);
          }} label="Password" placeholder="At least 6 characters"/>

          <InputBox label="Re-enter Password"/>

          <Button onClick={
            async ()=>{
              const response= await axios.post("http://localhost:3000/api/v1/user/signup", {
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: password
              });
              localStorage.setItem("token", response.data.token);
            }
          } label="Create your Flexipay account" className="mt-4"/>
          <BottomWarning label="Already have an account?" buttonText="Login" to="/signin" />
      </div>
    </div>
      </div>
      
    </div>
  )
}

export default Signup