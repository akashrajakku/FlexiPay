import Button from "./Button"

export default function Users() {
  return (
    <div className="px-4 sm:px-14 my-4">
        <div className="font-bold text-lg">Users</div>
        <div className="my-2">
            <input type="text" placeholder="Search Users..." className="border rounded border-gray-400 shadow-md px-2 py-1 w-full h-10"/>
        </div>
        <div>
            {<User />}
            {<User />}
            {<User />}
            {<User />}
            {<User />}
            {<User />}
            {<User />}
            {<User />}
            {<User />}
            {<User />}
        </div>
    </div>
  )
}

function User(){
    return(
        <div className="w-full flex justify-between border-2">
        <div className="flex justify-center items-center">
        <div className="rounded-full h-10 w-10 flex justify-center items-center bg-slate-300">
          <img
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${"Akash"}`}
            className="h-[90%] w-[90%] rounded-full"
          />
        </div>
            <div className="font-semibold text-sm ml-2">
                Akash Raj
            </div>
        </div>

        <div>
            <Button label={"Send Money"} className="mt-2"/>
        </div>
    </div>
    )
    
}

