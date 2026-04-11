import Header from "../componenets/header";
import { Route, Routes } from 'react-router-dom'
import ProductsPage from "./productsPage";
import ProductOverviewPage from "./productOverviewPage";
import CartPage from "./cart";
import CheckoutPage from "./checkout";

export default function HomePage(){
    return(
        <div className='w-full h-screen  flex flex-col'>
            
            <Header/>
            <div className="w-full h-[calc(100%-100px)] overflow-y-scroll border">
                <Routes>
                    <Route path="/" element={<h1>Welcome to...</h1>}/>
                    <Route path="/products" element={<ProductsPage/>}/>
                    <Route path="/contact-us" element={<h1>Welcome to con...</h1>}/>
                    <Route path="/overview/:productId" element={<ProductOverviewPage/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                </Routes>
                

            </div>
        </div>
    )
}
