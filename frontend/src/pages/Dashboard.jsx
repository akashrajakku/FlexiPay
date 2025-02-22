import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Footer from "../components/Footer";
import Users from "../components/Users"
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

function Dashboard() {
  const { firstName, balance } = useOutletContext() || {};
  const [showBalance, setShowBalance] = useState(false);

  const handleToggleBalance=()=>{
      setShowBalance((prev) => !prev)
  }

  return (
    <>
    <div className="min-h-screen">
      <Appbar user={firstName || "User"} />
      <Balance 
        flag={showBalance} 
        balanceText= {showBalance?"Your Balance":"Get Balance"}
        balance={balance || "Wait..."} 
        onClick={handleToggleBalance}
      />
      <Users />
      </div>
      <Footer />
    </>
  )
}

export default Dashboard