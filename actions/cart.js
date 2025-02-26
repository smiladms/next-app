"use server";

import { getFetch, postFetch } from "@/utils/fetch";
import { handleError } from "@/utils/helper";
import { cookies } from 'next/headers';


async function checkCoupon(state, formData) {
    const code = formData.get('code');

    if (code === '') {
        return {
            status: "error",
            message: "وارد کردن کد کوپن الزامی است"
        }
    }

    const token = cookies().get('token');
    const data = await postFetch('/check-coupon', { code }, { 'Authorization': `Bearer ${token.value}` });

    if (data.status === 'success') {
        return {
            status: data.status,
            message: "کد تخفیف شما اعمال شد",
            percent: data.data.percentage,
            code
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message),
        }
    }

}

async function getAddresses() {
    const token = cookies().get('token');
    return await getFetch('/user/addresses', { 'Authorization': `Bearer ${token.value}` });
}

async function payment(state, formData) {
    const cart = formData.get('cart');
    const coupon = formData.get('coupon');
    const address_id = formData.get('address_id');

    if (address_id === '') {
        return {
            status: "error",
            message: "انتخاب آدرس الزامی است"
        }
    }

    const token = cookies().get('token');
    const data = await postFetch('/payment/send', { cart: JSON.parse(cart), coupon, address_id }, { 'Authorization': `Bearer ${token.value}` });

    if (data.status === 'success') {
        return {
            status: data.status,
            message: "درحال انتقال به درگاه پرداخت",
            url: data.data.url,
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message),
        }
    }

}

async function paymentVeriy(trackId, status) {
    const token = cookies().get('token');
    const data = await postFetch('/payment/verify', { token: trackId, status }, { 'Authorization': `Bearer ${token.value}` });

    if (data.status === 'success') {
        return {
            status: data.status,
            payment: data.data
        }
    } else {
        return {
            status: data.status,
            message: handleError(data.message),
        }
    }
}

export { checkCoupon, getAddresses, payment, paymentVeriy }