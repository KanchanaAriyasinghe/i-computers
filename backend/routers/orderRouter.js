import express from "express"
import createOrder , {getOrders, updateOrderStatusAndNotes, payhereNotify} from "../controllers/orderController.js"

const orderRouter = express.Router()

orderRouter.post("/", createOrder)
orderRouter.get("/:pageSize/:pageNumber", getOrders )
orderRouter.put("/:orderId", updateOrderStatusAndNotes)
orderRouter.post("/payment/notify", payhereNotify)

export default orderRouter