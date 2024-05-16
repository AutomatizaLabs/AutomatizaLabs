import { useEffect, useState } from "react";
import { auth, db } from "../firebase"; 
import { useRouter } from 'next/navigation'; 
import { addConfig, checkUserExistence, getUserRole } from "./addUser";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false)
    const [redirected, setRedirected] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            setUser(authUser);
            if (!authUser && !redirected) {
                setRedirected(true);
                router.push("/login");
            } else {
                try {
                    const configExists = await checkUserExistence(authUser.uid);
                    if(!configExists){

                        await addConfig({
                            userId: authUser.uid, 
                            userEmail: authUser.email,
                            userRole: "user"
                        });
                        return
                    }
                    const userRole = await getUserRole(authUser.uid);
                    if (userRole === "admin") {
                        setIsAdmin(true);
                        router.push("/painel")
                    } else {
                        setIsAdmin(false);
                        router.push("/painel")
                    }
                } catch (error) {
                    console.error("Error adding config:", error);
                }
            }
        });

        return () => unsubscribe();
    }, [redirected, router]);

    return { user, isAdmin };
};

export default useAuth;