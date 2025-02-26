"use client"

import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function ShoppingCart({ product }) {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(removeFromCart(product.id))
        dispatch(addToCart({ product, qty: quantity }))
        toast.success('محصول به سبد خرید اضافه شد') 
    }

    return (
        <div className="mt-5 d-flex">
            <button onClick={() => handleAddToCart()} className="btn-add" >افزودن به سبد خرید</button>
            <div className="input-counter ms-4">
                <span className="plus-btn" onClick={() => quantity < product.quantity && setQuantity(prevQty => prevQty + 1)}>
                    +
                </span>
                <div className="input-number">{quantity}</div>
                <span className="minus-btn" onClick={() => quantity > 1 && setQuantity(prevQty => prevQty - 1)}>
                    -
                </span>
            </div>
        </div>
    )
}