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

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
              <InputBox
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                label="First Name"
                placeholder="Akash"
              />
              <InputBox
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                label="Last Name"
                placeholder="Raj"
              />
              <InputBox
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                label="Email"
                placeholder="abc@email.com"
              />
              <InputBox
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                label="Password"
                placeholder="At least 6 characters"
              />
              <InputBox label="Re-enter Password" />
              <Button
                onClick={async () => {
                  const response = await axios.post(
                    "http://localhost:3000/api/v1/user/signup",
                    {
                      username: username,
                      firstName: firstName,
                      lastName: lastName,
                      password: password,
                    }
                  );
                  localStorage.setItem("token", response.data.token);
                }}
                label="Create your Flexipay account"
                className="mt-4 w-full"
              />
              <BottomWarning
                label="Already have an account?"
                buttonText="Login"
                to="/signin"
              />
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