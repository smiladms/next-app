import EditForm from "@/components/profile/info/EditForm";
import { getFetch } from "@/utils/fetch"
import { cookies } from 'next/headers';

export default async function ProfilePage() {
    const token = cookies().get('token');
    const user = await getFetch("/profile/info", { 'Authorization': `Bearer ${token.value}` });
    
    return (
        <div className="vh-70">
            <EditForm user={user} />
        </div>
    )
}