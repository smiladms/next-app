import Loading from "@/components/profile/orders/Loading";
import Table from "@/components/profile/transactions/Table";
import { Suspense } from "react";

export default function OrdersPage({ searchParams }) {
    const params = new URLSearchParams(searchParams);
    
    return (
        <Suspense key={params.toString()} fallback={<Loading />}>
            <Table params={params.toString()} />
        </Suspense>
    )
}