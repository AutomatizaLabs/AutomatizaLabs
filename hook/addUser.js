import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
  getDoc,
  setDoc,
} from "firebase/firestore";

// const updateConfig = async (docId, updatedData) => {
//   try {
//     const configRef = doc(db, "users", docId);
//     await updateDoc(configRef, updatedData);
//   } catch (error) {
//     console.error("Error updating config:", error);
//     throw error;
//   }
// };

const addConfig = async ({ userId, userRole, userEmail }) => {
  try {
    const userDocRef = doc(db, "users", userId);
await setDoc(userDocRef, { 
    userRole: String(userRole),
    userEmail: String(userEmail)
});
  } catch (error) {
    console.error("Error adding user config:", error);
    throw error;
  }
};
const checkUserExistence = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    return userDocSnap.exists(); // Retorna true se o usuário existir, false caso contrário
  } catch (error) {
    console.error("Error checking user existence:", error);
    throw error;
  }
};
const getUserRole = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return userData.userRole; // Retorna a função do usuário se o documento existir
    } else {
      return null; // Retorna null se o documento do usuário não existir
    }
  } catch (error) {
    console.error("Error getting user role:", error);
    throw error;
  }
};
  
  export { addConfig, checkUserExistence, getUserRole };
