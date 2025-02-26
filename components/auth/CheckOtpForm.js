"use client"

import { useFormState } from 'react-dom'
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import SubmitButton from '@/components/SubmitButton';
import { checkOtp } from '@/actions/auth';
import AuthContext from '@/context/AuthContext';
import ResendOtpButton from './ResendOtpButton';
import { useRouter } from 'next/navigation';

export default function CheckOtpForm() {
    const [stateOtp, formActionOtp] = useFormState(checkOtp, {});
    const { loginContext } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        toast(stateOtp?.message, { type: `${stateOtp?.status}` });
        if (stateOtp?.status === 'success') {
            loginContext(stateOtp.user);
            router.push('/');
        }
    }, [stateOtp])

    return (
        <div className="card-body">
            <div className="form_container">
                <form action={formActionOtp}>
                    <div className="mb-3">
                        <label className="form-label">کد ورود </label>
                        <input name='otp' type="text" className="form-control" />
                    </div>
                    <SubmitButton title="تایید" style="btn btn-primary btn-auth" />
                </form>

                <ResendOtpButton />
            </div>
        </div>
    )
}