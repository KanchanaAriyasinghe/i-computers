import { Link,useNavigate, Route, Routes, useLocation  } from "react-router-dom";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminEditProductPage from "./admin/adminEditProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import AdminUsersPage from "./admin/adminUsersPage";
import AdminReviewsPage from "./admin/adminReviewsPage";
import { FaBoxOpen, FaUsers } from "react-icons/fa";
import { MdOutlineComputer, MdReviews } from "react-icons/md";
import { TbLogout } from "react-icons/tb";

export default function AdminPage(){
    const location = useLocation();
    const navigate = useNavigate()
    const isActive = (path) => location.pathname === path;

   const handleLogout = ()=>{
        navigate("/login")
   }
   
    return(
        <div className='w-full h-screen flex bg-accent  items-center'>
            <div className="w-[300px] h-full bg-accent text-white flex flex-col shadow-2xl">

    {/* Logo */}
    <div className="flex flex-col items-center justify-center py-6 border-b border-gray-700">
        <Link to="/" className="flex flex-col items-center">
            <img
                src="/logo.png"
                alt="Logo"
                className="h-[70px] object-contain"
            />

            <h1 className="text-xl font-bold mt-2 tracking-wide">
                Admin Panel
            </h1>
        </Link>
    </div>

    {/* Menu */}
    <div className="flex flex-col gap-2 p-4">

        <Link
            to="/admin/"
            className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-300
            ${
                isActive("/admin/")
                ? "bg-secondary shadow-lg"
                : "hover:bg-gray-700 hover:translate-x-1"
            }`}
        >
            <FaBoxOpen size={20} />
            <span className="font-medium">Orders</span>
        </Link>

        <Link
            to="/admin/products"
            className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-300
            ${
                isActive("/admin/products")
                ? "bg-secondary shadow-lg"
                : "hover:bg-gray-700 hover:translate-x-1"
            }`}
        >
            <MdOutlineComputer size={22} />
            <span className="font-medium">Products</span>
        </Link>

        <Link
            to="/admin/users"
            className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-300
            ${
                isActive("/admin/users")
                ? "bg-secondary shadow-lg"
                : "hover:bg-gray-700 hover:translate-x-1"
            }`}
        >
            <FaUsers size={20} />
            <span className="font-medium">Users</span>
        </Link>

        <Link
            to="/admin/reviews"
            className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-300
            ${
                isActive("/admin/reviews")
                ? "bg-secondary shadow-lg"
                : "hover:bg-gray-700 hover:translate-x-1"
            }`}
        >
            <MdReviews size={22} />
            <span className="font-medium">Reviews</span>
        </Link>
    </div>

    {/* Logout */}
    <div className="mt-auto p-4">
        <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-secondary hover:bg-gray-600 transition-all duration-300 font-semibold"
        >
            <TbLogout size={20} />
            Logout
        </button>
    </div>
</div>
            <div className="w-[calc(100%-300px)] h-screen bg-primary border-[6px] border-accent rounded-2xl">
                <Routes>
                    <Route path="/" element={<AdminOrdersPage/>}/>
                    <Route path="/products" element={<AdminProductsPage/>}/>
                    <Route path="/add-product" element={<AdminAddProductPage/>}/>
                    <Route path="/edit-product" element={<AdminEditProductPage/>}/>
                    <Route path="/users" element={<AdminUsersPage/>}/>
                    <Route path="/reviews" element={<AdminReviewsPage/>}/>
                </Routes>
            </div>
        </div>
    )
}
