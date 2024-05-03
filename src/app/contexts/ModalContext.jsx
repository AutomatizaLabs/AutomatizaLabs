"use client"
import { createContext, useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import ModalTodo from "../components/ModalTodo";

const ModalContext = createContext({})

export const useModalContext = () => useContext(ModalContext)

export default function ModalContextProvider({ children }) {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [selectedId, setSelectedId] = useState()
    return (
        <ModalContext.Provider value={{ onOpen, selectedId, setSelectedId }}>
            <ModalTodo isOpen={isOpen} onClose={onClose} />
            {children}
        </ModalContext.Provider>
    )
}