'use client'
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useRouter } from 'next/navigation'
const useAuth = () => {
    const [user, setUser] = useState(null);
    const [redirected, setRedirected] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (!user && !redirected) {
                setRedirected(true);
                router.push("/admin");
            }
        });

        return () => unsubscribe();
    }, [redirected, router]);
    return { user };
};

export default useAuth;
