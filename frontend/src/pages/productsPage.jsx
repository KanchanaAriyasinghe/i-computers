import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "../componenets/productCard"

export default  function ProductsPage(){

    const [products, setProducts]= useState([])
    const [isProductsAreLoaded, setIsProductsAreLoaded] = useState(false)

    useEffect(
        ()=>{
            if(!isProductsAreLoaded){
                axios.get(import.meta.env.VITE_API_URL+ "/products").then(
                    (response)=>{
                        console.log(response.data)
                        setProducts(response.data)
                        setIsProductsAreLoaded(true)
                    }
                ).catch(
                    (error)=>{
                        console.log(error)
                    }
                )
            }
        }
        ,[isProductsAreLoaded]
    )

    return(
        <div className="w-full p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center flex flex-wrap">
            {
                products.map(
                    (item)=>{
                        return(
                            <ProductCard key={item.productId} product={item}/>
                        )
                    }
                )
            }

        </div>
    )
}