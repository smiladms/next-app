"use client"

import Address from "@/components/cart/Address";
import Coupon from "@/components/cart/Coupon";
import Payment from "@/components/cart/Payment";
import { clearCart, decrement, increment, removeFromCart, totalAmountCart } from "@/redux/slices/cartSlice";
import { getBlurDataURL, numberFormat, salePercent } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CartPage() {
    const [coupon, setCoupon] = useState({ code: "", percent: 0 })
    const [addressId, setAddressId] = useState("")
    const state = useSelector((state => state.shoppingCart));
    const totalAmount = useSelector(totalAmountCart)
    console.log(totalAmount);
    const dispatch = useDispatch()

    return (
        <>
            {state.cart.length != 0 ? (
                <section className="single_page_section layout_padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                <div className="row gy-5">
                                    <div className="col-12">
                                        <div className="table-responsive">
                                            <table className="table align-middle">
                                                <thead>
                                                    <tr>
                                                        <th>محصول</th>
                                                        <th>نام</th>
                                                        <th>قیمت</th>
                                                        <th>تعداد</th>
                                                        <th>قیمت کل</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {state.cart.map(item => (
                                                        <tr key={item.id}>
                                                            <th>
                                                                <Image src={item.primary_image} placeholder="blur" blurDataURL={getBlurDataURL()} width={100} height={66} alt="product-image" />
                                                            </th>
                                                            <td className="fw-bold">{item.name}</td>
                                                            <td>
                                                                <div>
                                                                    {item.is_sale ? (
                                                                        <>
                                                                            <span>{numberFormat(item.sale_price)}</span>
                                                                            <del className="me-1">{numberFormat(item.price)}</del>
                                                                        </>
                                                                    ) : (
                                                                        <span>{numberFormat(item.price)}</span>
                                                                    )}
                                                                    <span className='ms-1'>تومان</span>
                                                                </div>
                                                                {item.is_sale ? (
                                                                    <div className="text-danger">
                                                                        {salePercent(item.price, item.sale_price)}% تخفیف
                                                                    </div>
                                                                ) : null}
                                                            </td>
                                                            <td>
                                                                <div className="input-counter">
                                                                    <span className="plus-btn" onClick={() => item.qty < item.quantity && dispatch(increment(item.id))}>
                                                                        +
                                                                    </span>
                                                                    <div className="input-number">{item.qty}</div>
                                                                    <span className="minus-btn" onClick={() => item.qty > 1 && dispatch(decrement(item.id))}>
                                                                        -
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {item.is_sale ? (
                                                                    <span>{numberFormat(item.sale_price * item.qty)}</span>
                                                                ) : (<span>{numberFormat(item.price * item.qty)}</span>)}
                                                                <span className="ms-1">تومان</span>
                                                            </td>
                                                            <td>
                                                                <i onClick={() => dispatch(removeFromCart(item.id))} className="bi bi-x text-danger fw-bold fs-4 cursor-pointer"></i>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <button onClick={() => dispatch(clearCart())} className="btn btn-primary mb-4">پاک کردن سبد خرید</button>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    
                                    <Coupon setCoupon={setCoupon} />

                                    <div className="col-12 col-md-6 d-flex justify-content-end align-items-baseline">
                                        <Address setAddressId={setAddressId} />
                                    </div>
                                </div>

                                <div className="row justify-content-center mt-5">
                                    <div className="col-12 col-md-6">
                                        <div className="card">
                                            <div className="card-body p-4">
                                                <h5 className="card-title fw-bold">مجموع سبد خرید</h5>
                                                <ul className="list-group mt-4">
                                                    <li className="list-group-item d-flex justify-content-between">
                                                        <div>مجموع قیمت :</div>
                                                        <div>
                                                            {numberFormat(totalAmount)} تومان
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between">
                                                        <div>تخفیف :
                                                            <span className="text-danger ms-1">{coupon.percent}%</span>
                                                        </div>
                                                        <div className="text-danger">
                                                            {numberFormat((totalAmount * coupon.percent) / 100)} تومان
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between">
                                                        <div>قیمت پرداختی :</div>
                                                        <div>
                                                            {numberFormat((totalAmount - (totalAmount * coupon.percent) / 100))} تومان
                                                        </div>
                                                    </li>
                                                </ul>
                                                <Payment cart={state.cart} coupon={coupon} addressId={addressId} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div className="cart-empty">
                    <div className="text-center">
                        <div>
                            <i className="bi bi-basket-fill" style={{ fontSize: '80px' }}></i>
                        </div>
                        <h4 className="text-bold">سبد خرید شما خالی است</h4>
                        <Link href="/menu" className="btn btn-outline-dark mt-3">
                            مشاهده محصولات
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}