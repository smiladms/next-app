"use client"

import { useEffect } from "react";
import { toast } from "react-toastify";
import { useFormState } from 'react-dom';
import { checkCoupon } from "@/actions/cart";
import SubmitButton from "@/components/SubmitButton";

export default function Coupon({setCoupon}) {
    const [state, formAction] = useFormState(checkCoupon, {});

    useEffect(() => {
        toast(state?.message, { type: `${state?.status}` });
        if(state?.status == 'success') {
            setCoupon({
                code: state.code,
                percent: state.percent
            })
        }
    }, [state]);

    return (
        <form action={formAction} className="col-12 col-md-6">
            <div className="input-group mb-3">
                <input name="code" type="text" className="form-control" placeholder="کد تخفیف" />
                <SubmitButton title="اعمال کد تخفیف" style="input-group-text" />
            </div>
        </form>
    )
}