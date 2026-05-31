import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { LuMessageCircleMore } from "react-icons/lu";
import UserData from "./userData";

export default function BottomNavigationBar(){
    return(
        <div className="flex lg:hidden fixed bottom-0 w-full h-[80px] p-2 bg-white shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.25)] justify-between">
            <Link to="/" className="h-full aspect-square flex justify-center items-center rounded-lg text-accent text-3xl shadow-2xl shadow-accent">
                <GoHome />
            </Link>
            <Link to="/products" className="h-full aspect-square flex justify-center items-center rounded-lg text-accent text-3xl shadow-2xl shadow-accent">
                <CiSearch />
            </Link>
            <Link to="/cart" className="h-full aspect-square flex justify-center items-center rounded-lg text-accent text-3xl shadow-2xl shadow-accent">
                <CiShoppingCart />
            </Link>
            <Link to="/contact-us" className="h-full aspect-square flex justify-center items-center rounded-lg text-accent text-3xl shadow-2xl shadow-accent">
                <LuMessageCircleMore />
            </Link>

            <UserData className="h-full aspect-square flex justify-center items-center rounded-lg text-accent text-3xl shadow-2xl shadow-accent"/>
        </div>
    )
}