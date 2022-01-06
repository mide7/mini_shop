import { Cart } from "./cart.model";
import { Document, model, Schema } from "mongoose"

export interface Order extends Document {
    orderId: string,
    owner: Schema.Types.ObjectId,
    items: OrderItems[],
    subtotal: number,
    status: status
}
enum status {
    INPROGRESS = "IN_PROGRESS",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}

export interface OrderItems extends Cart {
    total: number
}

const orderItemsSchema = new Schema<OrderItems>({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    total: {
        type: Number,
        required: true,
    }
});

const orderSchema = new Schema<Order>({
    orderId: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subtotal: {
        type: Number,
        required: true,
    },
    items: [orderItemsSchema],
    status: {
        type: String,
        required: true,
        default: status.INPROGRESS
    }
});


const OrderModel = model<Order>("Order", orderSchema)

export default OrderModel