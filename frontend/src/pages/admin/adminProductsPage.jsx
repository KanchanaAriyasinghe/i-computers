import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProductsPage(){

    const [products, setProducts] = useState([])
    useEffect (
        () =>{
            const token = localStorage.getItem("token")

            axios.get(import.meta.env.VITE_API_URL+"/products",{
                headers:{
                    "Authorization": "Bearer "+ token
                }
            }).then(
                (response)=>{
                    setProducts(response.data)
                }
            ).catch(
                (error)=>{
                    console.log(error)
                }
            )

        },
        []
    )

    return(

        <div className="w-full h-full overflow-y-scroll p-5">

{/*             {
                products.map(
                    (item)=> {
                        console.log(item)
                        
                        return <p key={item.productId}>
                            {item.productId}
                        </p>
                    }
                )
            } */}

            <div className="sticky top-0 w-full h-[100px] rounded-lg bg-accent text-white flex items-center p-5 justify-between shadow-2xl">
                <h1 className="text-2xl  font-semibold">Products</h1>
            </div>

            <table className="mt-5 w-full text-secondary">
                <thead className="bg-accent/45 h-[60px ] text-white">
                    <tr>
                        <th className="text-center border border-primary p-4">Image</th>
                        <th className="text-center border border-primary p-4">Product ID</th>
                        <th className="text-center border border-primary p-4">Nmae</th>
                        <th className="text-center border border-primary p-4">Price</th>
                        <th className="text-center border border-primary p-4">Labelled Price</th>
                        <th className="text-center border border-primary p-4">Brand</th>
                        <th className="text-center border border-primary p-4">Model</th>
                        <th className="text-center border border-primary p-4">Categgory</th>
                        <th className="text-center border border-primary p-4">Availability</th>
                        <th className="text-center border border-primary p-4">Stock</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        products.map(
                            (item) =>{
                                return(
                                    <tr className="odd:bg-gray-600 even:bg-primary odd:text-white border-t-4 border-primary hover:bg-accent/45" key={item.productId}>
                                        <td className="p-2">
                                            <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-full"/>
                                        </td>
                                        <td className="text-center text-wrap p-2">{item.productId}</td>
                                        <td className="text-center text-wrap p-2">{item.name}</td>
                                        <td className="text-center text-wrap p-2">{item.price}</td>
                                        <td className="text-center text-wrap p-2">{item.labeledPrice}</td>
                                        <td className="text-center text-wrap p-2">{item.brand}</td>
                                        <td className="text-center text-wrap p-2">{item.model}</td>
                                        <td className="text-center text-wrap p-2">{item.category}</td>
                                        <td className="text-center text-wrap p-2"></td>
                                        <td className="text-center text-wrap p-2">{item.stock}</td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>

            <Link to="/admin/add-product" className="fixed bottom-8 right-8 w-[60px] h-[60px] bg-accent flex items-center justify-center text-white text-3xl rounded-full shadow-lg hover:bg-black hover:text-accent">
                <FaPlus />
            </Link>

        </div>
    )
}