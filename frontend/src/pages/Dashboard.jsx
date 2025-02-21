import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import { useOutletContext } from "react-router-dom";

function Dashboard() {
  const { firstName } = useOutletContext() || {};

  return (
    <>
      <Appbar user={firstName || "User"} />
      <Balance balance={"10,000"} />
      <Users />
    </>
  )
}

export default Dashboard