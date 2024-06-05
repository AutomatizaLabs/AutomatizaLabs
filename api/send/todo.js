import { db } from "../../firebase";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
    query,
    onSnapshot,
    orderBy,
    where,
} from "firebase/firestore";

const updateTodo = async (docId, updatedData) => {
    try {
        const todoRef = doc(db, "todo", docId);
        await updateDoc(todoRef, updatedData);
    } catch (error) {
        console.error("Error updating todo:", error);
        throw error;
    }
};

function fetchTodos(setTodos) {
    const filters = [orderBy('displayDate', 'desc')]

    const q = query(
        collection(db, "todo"),
        ...filters
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
        let todoArray = [];
        querySnapshot.docs.forEach((doc) => {
            todoArray.push({ id: doc.id, ...doc.data() });
        });
        setTodos(todoArray);
    });

    return unsub;
}

const addTodo = async (todo) => {
    try {
        await addDoc(collection(db, "todo"), {
            ...todo,
            createdAt: new Date().getTime(),
        });
    } catch (err) {
        console.log(err);
    }
};

const toggleTodoStatus = async ({ docId, status, statusID }) => {
    try {
        const todoRef = doc(db, "todo", docId);
        await updateDoc(todoRef, {
            status,
            statusID,
        });
    } catch (err) {
        console.log(err);
    }
};

const deleteTodo = async (docId) => {
    try {
        const todoRef = doc(db, "todo", docId);
        await deleteDoc(todoRef);
    } catch (err) {
        console.log(err);
    }
};

export { addTodo, toggleTodoStatus, deleteTodo, updateTodo, fetchTodos };
