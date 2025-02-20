import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Logo from "../resources/logo.png";
import { useState } from "react";
import axios from "axios";
import signup1 from "../resources/signup1.png";
import signup2 from "../resources/signup2.jpg";
import Footer from '../components/Footer';
import ValidateEmail from "../utils/ValidateEmail";
import { useNavigate } from "react-router-dom";



const Signup = () => {
  {/* state variable to keep track of changes made in form and also to store error related to each field*/}
  const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: ""
  })

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: ""
})

const [loader, setLoader] = useState(false)
const [errorMessage, setErrorMessage] = useState("")

const navigate =useNavigate();

{/* Setting values and errors into state variable upon change in input field */}

  const handleInputChange = (event) =>{
      const {name, value} = event.target;

      setFormData(prev => ({ // we are creating shallow copy and entering data to specific field , keeping other intact
          ...prev, //created shallow copy of prev state of object formData
          [name]:value
      }));

      setErrors(prev=>({
          ...prev,
          [name]:""
      }))
  }

  {/*form validation check and error checks */}

  const validateForm = ()=>{
      let valid = true;
      const currentErrors = {};

      if(!formData.firstName.trim()){ // first name field is empty
          currentErrors.firstName= "First name is required";
          valid = false;
      }

      if(!formData.lastName.trim()){ // last name field is empty
          currentErrors.lastName= "Last name is required";
          valid = false;
      }

      if(!formData.email.trim()){
          currentErrors.email= "Email is required";
          valid=false;
      }

      if(!formData.password.trim()){
          currentErrors.password= "Password is required";
          valid=false;
      }

      if(!formData.password2.trim()){
          currentErrors.password= "Re-entering password is required";
          valid=false;
      }

      if(formData.email && !ValidateEmail(formData.email)){
          currentErrors.email = "Please enter a valid email address";
          valid =false;
      }

      if(formData.password && formData.password2 && formData.password !== formData.password2){
          currentErrors.password2= "Re-entered password doesn't match with password"
          valid=false;
      }

      setErrors(currentErrors);
      return valid;
  }

  const handleSubmission = async(event)=>{
    event.preventDefault();
    setLoader(true);

      if(validateForm()){
         try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                firstName:formData.firstName,
                lastName:formData.lastName,
                username:formData.email,
                password:formData.password
            });
            console.log(`response: ${response}`);

            setFormData({
                firstName:"",
                lastName:"",
                email:"",
                password:"",
                password2:""
            })

            setErrors({
              firstName:"",
              lastName:"",
              email:"",
              password:"",
              password2:""
            })

            localStorage.setItem("token", response.data.token);
            
              setLoader(false);
              navigate('/dashboard');
            
         } catch (error) {
            if(error.response){
              const errorData = error.response.data.error;
              const errorType= error.response.data.error.type;
              const message = error.response.data.error.message;

              if(errorData && errorType && message){

                  if(errorType === "Invalid Input"){
                    setLoader(false);
                    setErrorMessage(message);
                  }

                  else if(errorType === "Duplicate User"){
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
          }
        }else{
            console.log(`Form validation failed`);
            setLoader(false);
        }
    }


  return (
    <div className="min-h-screen flex flex-col ">
      {/* Logo Section */}
      <div className="pt-5 pb-9 pl-10">
        <img src={Logo} className="w-40" alt="Logo" />
      </div>

      {/* Form and Image Section */}
      <div className="flex flex-col justify-center lg:flex-row flex-1 p-5 lg:p-10">
        {/* Form Section (Left) */}
        <div className="flex justify-center items-center w-full lg:w-1/2 -translate-y-10 translate-x-10">
          <div className="rounded-lg w-full max-w-md text-center p-5 shadow-md">
            <div className="flex flex-col">
              <Heading label="Signup" />
              <SubHeading label="Create an account to continue" />
              <div>
                <InputBox
                  onChange={handleInputChange}
                  label="First Name"
                  placeholder="Akash"
                  name = "firstName"
                />
                <div className="flex justify-start">
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
              </div>

              <div>
                <InputBox
                  onChange={handleInputChange}
                  label="Last Name"
                  placeholder="Raj"
                  name = "lastName"
                />
                <div className="flex justify-start">
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <InputBox
                  onChange={handleInputChange}
                  label="Email"
                  placeholder="abc@email.com"
                  name = "email"
                />
                <div className="flex justify-start">
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}    
                </div>          
              </div>

              <div>
                <InputBox
                  onChange={handleInputChange}
                  label="Password"
                  placeholder="At least 6 characters"
                  name = "password"
                />
                <div className="flex justify-start">
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
              </div>

              <div>
                <InputBox 
                label="Re-enter Password" 
                onChange={handleInputChange}
                name = "password2"
                />
                <div className="flex justify-start">
                {errors.password2 && <p className="text-red-500 text-sm mt-1">{errors.password2}</p>}
                </div>
              </div>

              <Button
                disableFlag={loader}
                onClick={handleSubmission}
                label={loader?"Signing up":"Create your Flexipay account"}
                className="mt-4 w-full"
              />

              <BottomWarning
                label="Already have an account?"
                buttonText="Login"
                to="/signin"
              />

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


            {loader && (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
            )}

            </div>
          </div>
        </div>
        <div>
          <img src={signup2} alt="signup image" className=" absolute z-10 h-40 w-60 transform translate-x-35 -translate-y-4"></img>
        </div>
        {/* Image Section (Right) */}
        <div className="w-full lg:w-1/2 flex justify-center items-center mt-10 lg:mt-0">
          <img
            src={signup1}
            alt="signup image"
            className="object-cover max-w-[800px] max-h-[570px] w-auto h-auto -translate-y-10"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;