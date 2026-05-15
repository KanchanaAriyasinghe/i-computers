import { Link, Route, Routes } from "react-router-dom";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminEditProductPage from "./admin/adminEditProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import AdminUsersPage from "./admin/adminUsersPage";

export default function AdminPage(){
    return(
        <div className='w-full h-screen flex bg-accent  items-center'>
            <div className="w-[300px] h-full bg-accent text-white">
               

                <Link to="/admin/" className="block py-2 px-4 hover:bg-gray-700">Orders</Link>
                <Link to="/admin/products" className="block py-2 px-4 hover:bg-gray-700">Products</Link>
                <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-700">Users</Link>
                <Link to="/admin/reviews" className="block py-2 px-4 hover:bg-gray-700">Reviews</Link>
            </div>
            <div className="w-[calc(100%-300px)] h-screen bg-primary border-[6px] border-accent rounded-2xl">
                <Routes>
                    <Route path="/" element={<AdminOrdersPage/>}/>
                    <Route path="/products" element={<AdminProductsPage/>}/>
                    <Route path="/add-product" element={<AdminAddProductPage/>}/>
                    <Route path="/edit-product" element={<AdminEditProductPage/>}/>
                    <Route path="/users" element={<AdminUsersPage/>}/>
                    <Route path="/reviews" element={<h1>Reviews Dashboard</h1>}/>
                </Routes>
            </div>
        </div>
    )
}
