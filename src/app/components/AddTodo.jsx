import React from "react";
import {
    Box,
    Button,
} from "@chakra-ui/react";
import { useModalContext } from "../contexts/ModalContext";

const AddTodo = () => {
    const { onOpen, setSelectedId } = useModalContext();

    return (
        <Box mt={5}>
            <Button bgColor={"black"}
                data-testid="criar-registro"
                onClick={() => {
                    setSelectedId();
                    onOpen();
                }}
                mb={3}
                position={"relative"}
                top="5%"
            >
                Criar Registro
            </Button>
        </Box>
    );
};

export default AddTodo;
