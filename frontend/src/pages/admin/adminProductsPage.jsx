import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import LoadingAnimation from "../../componenets/loadingAnimation";
import ProductDeleteModal from "../../componenets/productDeleteModal";

export default function AdminProductsPage(){

    const [products, setProducts] = useState([])
    const [isProductsAreLoaded, setIsProductsAreLoaded] = useState(false)

    useEffect (
        () =>{
            if(!isProductsAreLoaded){
                const token = localStorage.getItem("token")

                axios.get(import.meta.env.VITE_API_URL+"/products",{
                    headers:{
                        "Authorization": "Bearer "+ token
                    }
                }).then(
                    (response)=>{
                        setProducts(response.data)
                        setIsProductsAreLoaded(true)
                    }
                ).catch(
                    (error)=>{
                        console.log(error)
                    }
                )
            }
        },
        [isProductsAreLoaded]
    )

    return(
        <div className="w-full h-full overflow-y-auto p-6 bg-gray-100 rounded-lg">

            {/* Header */}
            <div className="sticky top-0 z-10 w-full h-[90px] rounded-xl bg-gradient-to-r from-accent to-primary text-white flex items-center px-6 justify-between shadow-lg mb-6">
                <h1 className="text-3xl font-bold tracking-wide">Products</h1>
                <p className="text-sm opacity-80">{products.length} Items</p>
            </div>

            {/* Table Container */}
            {
                isProductsAreLoaded ?
                <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                    <table className="w-full text-sm text-gray-700">
                        
                        {/* Table Head */}
                        <thead className="bg-gray-200 text-gray-800 uppercase text-xs">
                            <tr>
                                <th className="p-4">Image</th>
                                <th className="p-4">ID</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Label Price</th>
                                <th className="p-4">Brand</th>
                                <th className="p-4">Model</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Stock</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {
                                products.map((item) =>(
                                    <tr 
                                        key={item.productId}
                                        className="border-b hover:bg-gray-50 transition duration-200"
                                    >
                                        <td className="p-3 text-center">
                                            <img 
                                                src={item.images[0]} 
                                                alt={item.name} 
                                                className="w-14 h-14 object-cover rounded-lg shadow"
                                            />
                                        </td>

                                        <td className="p-3 text-center font-medium">{item.productId}</td>

                                        <td className="p-3 text-center font-semibold">{item.name}</td>

                                        <td className="p-3 text-center text-green-600 font-semibold">
                                            ${item.price}
                                        </td>

                                        <td className="p-3 text-center line-through text-gray-400">
                                            ${item.labeledPrice}
                                        </td>

                                        <td className="p-3 text-center">{item.brand}</td>

                                        <td className="p-3 text-center">{item.model}</td>

                                        <td className="p-3 text-center">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                                                {item.category}
                                            </span>
                                        </td>

                                        {/* Availability */}
                                        <td className="p-3 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                                                ${item.isAvailable ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                                                {item.isAvailable ? "Available" : "Unavailable"}
                                            </span>
                                        </td>

                                        {/* Stock */}
                                        <td className="p-3 text-center">
                                            <span className={`font-semibold 
                                                ${item.stock > 10 ? "text-green-600" : item.stock > 0 ? "text-yellow-500" : "text-red-500"}`}>
                                                {item.stock}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="p-3 flex items-center justify-center gap-3">
                                            <ProductDeleteModal 
                                                product={item}
                                                refresh={()=>{
                                                    setIsProductsAreLoaded(false)
                                                }}
                                            />

                                            <Link to="/admin/edit-product" state={item}>
                                                <BiEdit className="text-xl text-blue-500 cursor-pointer hover:text-blue-700 transition"/>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                :
                <LoadingAnimation/>   
            }

            {/* Floating Add Button */}
            <Link 
                to="/admin/add-product" 
                className="fixed bottom-8 right-8 w-[65px] h-[65px] bg-gradient-to-r from-accent to-primary flex items-center justify-center text-white text-3xl rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition"
            >
                <FaPlus />
            </Link>
        </div>
    )
}