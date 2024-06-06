import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { fetchTodos } from "../api/send/todo";

export default function useTodo() {
    const [todos, setTodos] = useState([])

    const { user } = useAuth()

    const todomap = Object.fromEntries(todos.map(todo => [todo.id, todo]))

    useEffect(() => {
        const unsubscribe = fetchTodos(setTodos)
        window.addEventListener('beforeunload', () => {
            if (unsubscribe)
                unsubscribe();
        });
        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }
    }, [user])

    return { todomap, todos }
}