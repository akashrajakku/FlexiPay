import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Footer from "../components/Footer";
import Users from "../components/Users";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext"; // Import UserContext

function Dashboard() {
  const { user } = useContext(UserContext); // Get user from context
  const [showBalance, setShowBalance] = useState(false);

  const handleToggleBalance = () => {
    setShowBalance((prev) => !prev);
  };

  return (
    <>
      <div className="min-h-screen">
        <Appbar user={user?.firstName || "User"} />
        <Balance 
          flag={showBalance} 
          balanceText={showBalance ? "Your Balance" : "View Balance"}
          balance={user?.balance ?? "Wait..."} 
          onClick={handleToggleBalance}
        />
        <Users />
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
