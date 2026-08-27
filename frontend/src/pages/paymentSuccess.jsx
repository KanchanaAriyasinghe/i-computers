import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function PaymentSuccess(){

    const navigate = useNavigate()

    useEffect(() => {

        const timer = setTimeout(() => {
            navigate("/my-orders")
        }, 3000)

        return () => clearTimeout(timer)

    }, [navigate])

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">

            <h1 className="text-3xl font-bold text-green-600">
                Payment Successful
            </h1>

            <p className="mt-3 text-gray-600">
                Your payment was received successfully.
            </p>

            <p className="mt-2 text-gray-500">
                Redirecting to your orders...
            </p>

        </div>
    )
}