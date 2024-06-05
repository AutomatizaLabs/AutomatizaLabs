import React, { useState, useEffect } from "react";
import {
    Badge,
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useColorModeValue,
    useToast,
    Input,
    TableContainer,
} from "@chakra-ui/react";
import useAuth from "../../../hook/useAuth";
import { FaTrash } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import { deleteTodo, toggleTodoStatus } from "../../../api/send/todo";
import { useModalContext } from "../contexts/ModalContext";
import useTodo from "../../../hook/useTodos";

const TodoListedit = () => {
    const { onOpen, setSelectedId } = useModalContext();
    const { todos } = useTodo();

    const { user } = useAuth();
    const toast = useToast();
    const [searchText, setSearchText] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const todosPerPage = 12;
    const color = useColorModeValue('white', 'white');
    const colordark = useColorModeValue('gray', 'gray');


    const handleSearch = (event) => {
        const searchText = event.target.value.toLowerCase();
        setPageNumber(0); // Reiniciar para a primeira página
        setSearchText(searchText);
    };

    useEffect(() => {
        const filtered = todos.filter((todo) => {
            return (
                todo.city.toLowerCase().includes(searchText) ||
                todo.company.toLowerCase().includes(searchText) ||
                todo.displayDate.includes(searchText) ||
                todo.userEmail.includes(searchText) ||
                todo.status.toLowerCase().includes(searchText)
            );
        });

        setFilteredTodos(filtered);
    }, [searchText, todos]);

    const pageCount = Math.ceil(filteredTodos.length / todosPerPage);

    const getPaginatedData = () => {
        const offset = pageNumber * todosPerPage;
        return filteredTodos.slice(offset, offset + todosPerPage);
    };

    const handleTodoDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja deletar?")) {
            deleteTodo(id);
            toast({
                title: "Deletado com Sucesso!",
                status: "success",
                duration: 1500,
            });
        }
    };

    const getColorForTodo = (color) => {
        switch (color) {
            case "blue":
                return "#0191C8";
            case "red":
                return "#F4837D";
            case "yellow":
                return "#F2C02B";
            case "purple":
                return "#9F7AEA";
            case "green":
                return "#26A137";
            case "white":
                return "#C0C0C0";
            default:
                return "#CBD5E0";
        }
    };

    const getDarkerColorForTodo = (color) => {
        switch (color) {
            case "blue":
                return "#005B9A";
            case "red":
                return "#EB4960";
            case "yellow":
                return "#F39D36";
            case "purple":
                return "#7A5CC7";
            case "green":
                return "#12511A";
            case "white":
                return "#A0A0A0";
            default:
                return "#9CAAC4";
        }
    };


    const handlePageClick = (selectedPage) => {
        setPageNumber(selectedPage);
    };

    return (
        <Box display="flex" flexDirection="column" width="100%">
            <Input
                borderColor={"black"}
                backgroundColor="#A4AFB7"
                borderRadius={"20px"}
                color={"black"}
                paddingLeft={"8px"}
                width="20%"
                placeholder="Buscar"
                _placeholder={{ opacity: 1, color: 'aliceblue' }}
                value={searchText}
                onChange={handleSearch}
                mb={4}
                position={"relative"}
                justifyContent="start"
                display="flex"
            />
            <Box
                maxHeight="100%"
                mt={5}
                display="relative"
                flexDirection="column"
                justifyContent="start"
                maxWidth="100%"
            >
                <TableContainer
                    display="flex"
                    color={color}
                    flexDirection="column"
                    alignContent="center"
                    width="100%"
                    overflowX="auto"
                >
                    <Table variant="simple">
                        <Thead>
                            <Tr style={{ color: "black " }}>
                                <Th>Ações</Th>
                                <Th>Data de Realização</Th>
                                <Th>Email</Th>
                                <Th>Empresa</Th>
                                <Th>Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {getPaginatedData().map((todo) => (
                                <Tr bg={getColorForTodo(todo.color)} key={todo.id}>
                                    <Td alignItems="center">
                                        <Box display="flex">
                                            <Badge
                                                bg={getDarkerColorForTodo(todo.color)}
                                                data-testid={`Delete${todo.userEmail}`}
                                                padding={2}
                                                color={color}
                                                transition="0.2s"
                                                _hover={{
                                                    bg: "red",
                                                    transform: "scale(1.2)",
                                                    color: `${colordark}`,
                                                }}
                                                cursor="pointer"
                                                onClick={() => user && handleTodoDelete(todo.id)}
                                            >
                                                {user && <FaTrash />}
                                            </Badge>
                                            <Badge
                                                bg={getDarkerColorForTodo(todo.color)}
                                                padding={2}
                                                float="right"
                                                data-testid={`Edit${todo.userEmail}`}
                                                color={color}
                                                opacity="0.8"
                                                ml={2}
                                                transition="0.2s"
                                                _hover={{
                                                    color: `${colordark}`,
                                                    bg: "green.400",
                                                    transform: "scale(1.2)",
                                                }}
                                                cursor="pointer"
                                                onClick={() => {
                                                    setSelectedId(todo.id);
                                                    onOpen();
                                                }}
                                            >
                                                <MdEditSquare />
                                            </Badge>
                                        </Box>
                                    </Td>
                                    <Td>{todo.displayDate}</Td>
                                    <Td>{todo.userEmail}</Td>
                                    <Td>{todo.company}</Td>
                                    <Td>{todo.status}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            {pageCount > 1 && (
                <Box display="flex" justifyContent="center" mt={4}>
                    {Array.from({ length: pageCount }).map((_, index) => (
                        <span
                            key={index}
                            className={`pagination_page ${index === pageNumber ? 'active' : ''}`}
                            onClick={() => handlePageClick(index)}
                            style={{
                                cursor: "pointer",
                                margin: "0 5px",
                                padding: "5px",
                                borderRadius: "5px",
                                color: index === pageNumber ? "blue" : "",
                                backgroundColor: index === pageNumber ? "lightblue" : "transparent",
                            }}
                        >
                            {index + 1}
                        </span>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default TodoListedit;
