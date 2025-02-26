"use client"

import SubmitButton from "../SubmitButton";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useFormState } from 'react-dom';
import { payment } from "@/actions/cart";
import { useRouter } from "next/navigation";

export default function Payment({cart, coupon, addressId}) {
    const [statePayment, formActionPayment] = useFormState(payment, {});
    const router = useRouter()

    useEffect(() => {
        toast(statePayment?.message, { type: `${statePayment?.status}` });
        if (statePayment?.status == 'success') {
            router.push(statePayment.url)
        }
    }, [statePayment]);

    return(
        <form action={formActionPayment}>
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            <input type="hidden" name="coupon" value={coupon.code} />
            <input type="hidden" name="address_id" value={addressId} />

            <SubmitButton title="پرداخت" style="user_option btn-auth mt-4" />
        </form>
    )
}