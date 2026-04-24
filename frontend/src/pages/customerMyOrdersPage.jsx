import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import getFormattedPrice from "../utils/price-format";
import LoadingAnimation from "../componenets/loadingAnimation";
import CustomerOrderDetailsModal from "../componenets/customerOrderDetailsModal";


export default function CustomerMyOrdersPage(){

    const [orders, setOrders] = useState([])
    const [pageSize, setPageSize]= useState(10)
    const [currentPage, setCurrentPage]  =useState(1)
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [isOrdersAreLoaded, setIsOrdersAreLoaded] = useState(false)

    useEffect (
        () =>{
            if(!isOrdersAreLoaded){
                const token = localStorage.getItem("token")

                axios.get(import.meta.env.VITE_API_URL+"/orders/"+pageSize+"/"+currentPage,{
                    headers:{
                        "Authorization": "Bearer "+ token
                    }
                }).then(
                    (response)=>{
                        setOrders(response.data.orders)
                        setTotalPages(response.data.totalPages)
                        setTotalOrders(response.data.total)
                        setIsOrdersAreLoaded(true)
                    }
                ).catch(
                    (error)=>{
                        console.log(error)
                    }
                )
            }
        },
        [isOrdersAreLoaded]
    )

    return(
        <div className="w-full h-full overflow-y-auto p-6 bg-gray-100 rounded-lg">

            {/* Header */}
            <div className="sticky top-0 z-10 w-full h-[90px] rounded-xl bg-gradient-to-r from-accent to-primary text-white flex items-center px-6 justify-between shadow-lg mb-6">
                <div>
					<h1  className="text-3xl font-bold tracking-wide">Orders</h1>
					<p className="text-sm opacity-80">
						Manage your store Orders with ease
					</p>
				</div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                        Total Orders: <span className="font-semibold text-gray-800">{totalOrders}</span>
                    </span>
                </div>
            </div>

            {/* Table Container */}
            {
                isOrdersAreLoaded ?
                <>
                <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                    <table className="w-full text-sm text-gray-700">
                        
                        {/* Table Head */}
                        <thead className="bg-gray-200 text-gray-800 uppercase text-xs">
                            <tr>
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">First Name</th>
                                <th className="p-4">Last Name</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {
                                orders.map((item) =>(
                                    <tr 
                                        key={item.OrderId}
                                        className="border-b hover:bg-gray-50 transition duration-200"
                                    >


                                        <td className="p-3 text-center font-medium">{item.orderId}</td>

                                        <td className="p-3 text-center font-semibold">{item.email}</td>

                                        <td className="p-3 text-center  text-gray-400">
                                            {item.firstName}
                                        </td>

                                        <td className="p-3 text-center  text-gray-400">
                                            {item.lastName}
                                        </td>

                                        <td className="p-3 text-center">{item.phone}</td>

                                        <td className="p-3 text-center">{new Date(item.date).toLocaleDateString()}</td>

                                        <td className="p-3 text-center">
                                            <span className="font-semibold text-gray-800">
												{getFormattedPrice(item.total)}
											</span>
                                        </td>

                                        <td className="p-3 text-center">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-3 flex items-center justify-center">
                                            <CustomerOrderDetailsModal order={item}/>
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                   
                </div>
                 <div className="w-full flex justify-end items-center gap-3 mt-4">
                        <button
							onClick={() => {
								if (currentPage > 1) {
									setCurrentPage(currentPage - 1);
									setIsOrdersAreLoaded(false);
								}
							}}
							className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
						>
							Previous
						</button>
						<span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
						<button
							onClick={() => {
								setCurrentPage(currentPage + 1);
								setIsOrdersAreLoaded(false);
							}}
							className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
						>
							Next
						</button>
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(parseInt(e.target.value));
                                setIsOrdersAreLoaded(false);
                            }}
                            className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                        >
                            <option value={2}>2</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>

                </>
                :
                <LoadingAnimation/>   
            }
        </div>
    )
}