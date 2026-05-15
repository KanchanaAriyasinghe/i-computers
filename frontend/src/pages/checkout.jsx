import { useState } from "react"
import { addToCart, getCart, getCartTotal } from "../utils/cart"
import getFormattedPrice from "../utils/price-format"
import { useLocation } from "react-router-dom"
import CreateOrderModal from "../componenets/createOrderModal"

export default function CheckoutPage(){
    const location = useLocation()
    const [cart, setCart] = useState(location.state)
    return(
        <div className="w-full min-h-full flex flex-col p-5 lg:pb-20 items-center gap-4 pb-[150px]">
            {cart.map(
                (item, index)=>{
                    return(
                        <div key={item.product.productId} className="bg-white w-full lg:w-[500px] lg:h-[150px] rounded-lg shadow-2xl flex lg:flex-row flex-col p-2 lg:items-center relative">
                            <img className="w-[100px] h-[100px] object-cover rounded-l-lg" src={item.product.image}/>
                            <div className="h-full w-full lg:w-[400px] ml-2">
                                <h1 className="w-full text-lg font-semibold ">{item.product.name}</h1>
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
                                                        const newCart = [...cart]
                                                        newCart[index].quantity -= 1
                                                        if(newCart[index].quantity <= 0){
                                                            newCart.splice(index , 1)
                                                        }
                                                        setCart(newCart)
                                                    }
                                    }
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button className="text-xl font-bold cursor-pointer hover:text-accent"
                                    onClick={
                                                    ()=>{
                                                        //const newCart = {...cart}
                                                        const newCart = [...cart]

                                                        newCart[index].quantity += 1

                                                        setCart(newCart)
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

            <div className=" w-full lg:w-[500px] bg-white border  rounded-t-lg  shadow-2xl flex p-2 items-center  justify-between fixed bottom-[82px] lg:bottom-0">
                <CreateOrderModal cart={cart}/>
                <p className="text-xl font-bold ml-4">Total: {getFormattedPrice(getCartTotal(cart))}</p>
            </div>
            
        </div>
    )
}