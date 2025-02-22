import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Footer from "../components/Footer";
import Users from "../components/Users"
import { useOutletContext } from "react-router-dom";

function Dashboard() {
  const { firstName, balance } = useOutletContext() || {};

  return (
    <>
    <div className="min-h-screen">
      <Appbar user={firstName || "User"} />
      <Balance balance={balance || "Wait..."} />
      <Users />
      </div>
      <Footer />
    </>
  )
}

export default Dashboard