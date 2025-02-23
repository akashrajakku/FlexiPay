import Button from "./Button"
import { useNavigate } from "react-router-dom"

const RenderUser = ({label}) => {
    const navigate = useNavigate();
      return(
          <div className="w-full flex justify-between border-b-2 mb-2">
          <div className="flex justify-center items-center">
          <div className="rounded-full h-10 w-10 flex justify-center items-center bg-slate-300">
            {<img
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${label.firstName}`}
              className="h-[90%] w-[90%] rounded-full"
            />}
          </div>
              <div className="font-semibold text-sm ml-2">
                  {label.firstName + " " + label.lastName}
              </div>
          </div>
  
          <div>
              <Button onClick={(e)=>{navigate(`/send?id=${label._id}&name=${label.firstName}`)}} label={"Send Money"} className="mt-2"/>
          </div>
      </div>
      )
}

export default RenderUser