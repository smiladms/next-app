"use client"

import { logout } from "@/actions/auth";
import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Layout({ children }) {
    const { logoutContext } = useContext(AuthContext);
    const router = useRouter();

    return (
        <section className="profile_section layout_padding">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-lg-3">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link href="/profile">اطلاعات کاربر</Link>
                            </li>
                            <li className="list-group-item">
                                <Link href="/profile/addresses">آدرس ها</Link>
                            </li>
                            <li className="list-group-item">
                                <Link href="/profile/orders">سفارشات</Link>
                            </li>
                            <li className="list-group-item">
                                <Link href="/profile/transactions">تراکنش ها</Link>
                            </li>
                            <li className="list-group-item">
                                <a href="#" onClick={async () => {
                                    await logout();
                                    logoutContext()
                                    router.push('/')
                                }}>خروج</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-sm-12 col-lg-9">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}