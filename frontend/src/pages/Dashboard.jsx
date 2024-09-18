import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"

function Dashboard() {
  return (
    <>
      <Appbar user={"Akash"}/>
      <Balance balance={"10,000"} />
      <Users />
    </>
  )
}

export default Dashboard