'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@supabase/auth-helpers-react";

export default function ProtectedRoute({children}: {children: React.ReactNode}) {
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        if(!session) {
            router.push('/Login')
        }
    }, [session, router])

    if (session === undefined) return null;
    
    return <>{children}</>
}