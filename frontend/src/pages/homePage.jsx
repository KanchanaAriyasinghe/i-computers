import Header from "../componenets/header";
import { Route, Routes } from 'react-router-dom'
import ProductsPage from "./productsPage";
import ProductOverviewPage from "./productOverviewPage";
import CartPage from "./cart";
import CheckoutPage from "./checkout";
import CustomerMyOrdersPage from "./customerMyOrdersPage";
import SettingsPage from "./settings";
import BottomNavigationBar from "../componenets/bottomNavigationBar";
import NotFoundPage from "./notFoundPage";
import LandingPage from "./landingPage";

export default function HomePage(){
    return(
        <div className='w-full h-screen  flex flex-col'>
            
            <Header/>
            <div className="w-full h-[calc(100%-100px)] overflow-y-scroll border">
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/products" element={<ProductsPage/>}/>
                    <Route path="/contact-us" element={<h1>Welcome to con...</h1>}/>
                    <Route path="/overview/:productId" element={<ProductOverviewPage/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/my-orders" element={<CustomerMyOrdersPage/>}/>
                    <Route path="/settings" element={<SettingsPage/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                    <Route path="/*" element={<NotFoundPage/>}/>
                </Routes>

                <BottomNavigationBar/>
                

            </div>
        </div>
    )
}
