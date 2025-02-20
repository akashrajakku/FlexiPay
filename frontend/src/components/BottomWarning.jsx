import { Link } from "react-router-dom"
export default function BottomWarning({label, buttonText, to, className}) {
   return <div className="py-2 text-sm flex justify-center">
     <div className={className}>
       {label}
     </div>
     <Link className="pointer underline pl-1 cursor-pointer" 
     to={to}>
       {buttonText}
     </Link>
   </div>
}