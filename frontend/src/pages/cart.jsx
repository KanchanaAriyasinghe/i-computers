import { useState } from "react"
import { addToCart, getCart, getCartTotal } from "../utils/cart"
import getFormattedPrice from "../utils/price-format"
import { Link } from "react-router-dom"

export default function CartPage(){
    const [cart, setCart] = useState(getCart())
    return(
        <div className="w-full min-h-full flex flex-col p-5 pb-20 items-center gap-4">
            {cart.map(
                (item)=>{
                    return(
                        <div key={item.product.productId} className="bg-white w-[500px] h-[150px] rounded-lg shadow-2xl flex p-2 items-center relative">
                            <img className="w-[100px] h-[100px] object-cover rounded-l-lg" src={item.product.image}/>
                            <div className="h-full w-[400px] ml-2">
                                <h1 className="text-lg font-semibold ">{item.product.name}</h1>
                                <p className="text-sm text-gray-500">{item.product.productId}</p>
                                {
                                    item.product.labeledPrice > item.product.price && <span className="text-sm text-gray-500 mt-2 line-through">{getFormattedPrice(item.product.labeledPrice)}</span>
                                }
                                <p className="text-accent font-semibold text-sm ">
                                    {getFormattedPrice(item.product.price)}

                                </p>

                            </div>
                            <div  className="w-[200px] h-full absolute right-2  flex flex-col justify-end items-end p-2">
                                <div className="w-[100px] h-[30px] border rounded-full flex items-center justify-between px-2">
                                    <button className="text-xl font-bold cursor-pointer hover:text-accent"
                                    onClick={
                                        ()=>{
                                            addToCart(item.product, -1)
                                            setCart(getCart())
                                        }
                                    }
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button className="text-xl font-bold cursor-pointer hover:text-accent"
                                    onClick={
                                        ()=>{
                                            addToCart(item.product, 1)
                                            setCart(getCart())
                                        }
                                    }
                                    >
                                        +
                                    </button>

                                </div>

                                {/* total */}
                                <p className="text-xl  mt-2"><span className="text-secondary font-semibold">{getFormattedPrice(item.product.price * item.quantity)}</span></p>

                            </div>

                        </div>
                    )
                }
            )}

            <div className=" w-[500px] bg-white border  rounded-t-lg  shadow-2xl flex p-2 items-center  justify-between fixed bottom-0">
                <Link to="/checkout" state={cart} className="bg-accent text-white px-4 py-2 rounded-lg font-semibold">Checkout</Link>
                <p className="text-xl font-bold ml-4">Total: {getFormattedPrice(getCartTotal(cart))}</p>
            </div>
            
        </div>
    )
}