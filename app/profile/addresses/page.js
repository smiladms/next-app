import CreateForm from "@/components/profile/addresses/CreateForm";
import EditForm from "@/components/profile/addresses/EditForm";
import { getFetch } from "@/utils/fetch";
import { cookies } from 'next/headers';

export default async function AddressesPage() {
    const token = cookies().get('token');
    const { addresses, provinces, cities } = await getFetch("/profile/addresses", { 'Authorization': `Bearer ${token.value}` });

    return (
        <>
            <CreateForm provinces={provinces} cities={cities} />
            <hr />
            {addresses.map(address => (
                <EditForm key={address.id} address={address} provinces={provinces} cities={cities} />
            ))}
        </>
    )
}