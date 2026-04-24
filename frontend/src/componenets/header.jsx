import { Link } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import UserData from "./userData";

export default function Header(){
    return(
     <header className="w-full h-[100px] bg-accent relative flex justify-center items-center flex-shrink-0">
        <Link to="/" className="w-[200px] h-full absolute left-10 flex justify-center items-center">
            <img src="/logo.png" alt="Logo" className="h-[60px] mr-2" />
        </Link>
        <div className="h-full  flex justify-center items-center gap-10">
            <Link to="/" className="text-white text-lg font-semibold">Home</Link>
            <Link to="/products" className="text-white text-lg font-semibold">Products</Link>
            <Link to="/contact-us" className="text-white text-lg font-semibold">Contact Us</Link>
        </div>

        <div className=" h-[50px] absolute right-30 flex justify-center items-center">
            <UserData/>
        </div>

        <Link to="/cart" className="w-[50px] h-[50px] absolute right-10 flex justify-center items-center">
            <BiCart className="text-white text-3xl"/>     
        </Link>
     </header>
    )
}