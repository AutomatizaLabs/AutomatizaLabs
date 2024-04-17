import { useEffect, useState } from "react";
import { auth, db } from "../firebase"; // Assumindo que 'db' é a instância do Firestore que você está usando
import { useRouter } from 'next/navigation'; // Corrigi o import para 'router' em vez de 'navigation'
import { addConfig, checkUserExistence, getUserRole } from "./addUser";

const useAuth = () => {
    const [user, setUser] = useState(null);
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
                            userRole: "user"
                        });
                        return
                    }
                    const userRole = await getUserRole(authUser.uid);
                    if (userRole === "admin") {
                        router.push("/adminpanel");
                    } else {
                        router.push("/userpanel");
                    }

                } catch (error) {
                    console.error("Error adding config:", error);
                }
            }
        });

        return () => unsubscribe();
    }, [redirected, router]);

    return { user };
};

export default useAuth;
