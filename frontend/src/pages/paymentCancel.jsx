import { useNavigate } from "react-router-dom"

export default function PaymentCancel(){

    const navigate = useNavigate()

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">

            <h1 className="text-3xl font-bold text-red-500">
                Payment Cancelled
            </h1>

            <p className="mt-3 text-gray-600">
                Your payment was cancelled.
            </p>

            <button
                className="mt-5 px-5 py-2 bg-blue-500 text-white rounded"
                onClick={() => navigate("/")}
            >
                Go Home
            </button>

        </div>
    )
}