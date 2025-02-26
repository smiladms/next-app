"use client"

import { getAddresses } from "@/actions/cart";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Address({ setAddressId }) {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAddresses = async () => {
            const data = await getAddresses();
            setAddresses(data)
            setLoading(false)
        }
        fetchAddresses();
    }, []);

    if (loading) {
        return (<div className="spinner-border spinner-border-sm ms-2"></div>)
    }

    if (addresses.length == 0) {
        return (<Link href="/profile/addresses" className="btn btn-primary"> ایجاد آدرس </Link>)
    }

    return (
        <>
            <div>
                انتخاب آدرس
            </div>
            <select onChange={(e) => setAddressId(e.target.value)} defaultValue="" style={{ width: '200px' }} className="form-select ms-3" aria-label="Default select example">
                <option value="" disabled >انتخاب آدرس</option>
                {addresses.map((address) => (
                    <option key={address.id} value={address.id}>{address.title}</option>
                ))}
            </select>
        </>
    )
}