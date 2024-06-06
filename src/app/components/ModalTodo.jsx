import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react";
import FormInput from "./FormInput";
import { updateTodo, addTodo } from "../../../api/send/todo";
import useTodo from "../../../hook/useTodos";
import { useModalContext } from "../contexts/ModalContext";
import useAuth from "../../../hook/useAuth";

const statusOptions = [
    { statusId: "", status: "" },
    { statusId: "1", status: "Em análise" },
    { statusId: "2", status: "Em preparação" },
    { statusId: "3", status: "Em desenvolvimento" },
    { statusId: "4", status: "Concluido" },
    { statusId: "5", status: "Suspenso" },
    { statusId: "6", status: "Problema no Pagamento" },
    { statusId: "7", status: "Encerado" }
];

const statusMap = Object.fromEntries(statusOptions.map(option => [option.statusId, option]))

const colorOptions = [
    { value: 'blue', label: 'Azul' },
    { value: 'red', label: 'Vermelho' },
    { value: 'yellow', label: 'Amarelo' },
    { value: 'green', label: 'Verde' },
    { value: 'white', label: 'Cinza' }
]

export default function ModalTodo({ isOpen, onClose }) {
    const { todomap } = useTodo();
    const { selectedId } = useModalContext();
    const { user } = useAuth();
    const toast = useToast();

    const [status, setStatus] = useState("");
    const [statusId, setStatusId] = useState(""); // Adicione o campo statusID
    const [userEmail, setUserEmail] = useState("");
    const [city, setCity] = useState("");
    const [company, setCompany] = useState("");
    const [displayDate, setDisplayDate] = useState("");
    const [executionDate, setExecutionDate] = useState("");
    const [observation, setObservation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const isEdit = !!selectedId;
    const [color, setColor] = useState("blue");

    const isFormValid =
        city.length > 0 &&
        userEmail.length > 0 &&
        company.length > 0 &&
        displayDate.length > 0 &&
        statusId !== "";

    useEffect(() => {
        if (selectedId && todomap[selectedId]) {
            const todoData = todomap[selectedId];
            const statusId = statusHandler(todoData.statusId, todoData.status)
            setStatus(todoData.status);
            setStatusId(statusId);
            setUserEmail(todoData.userEmail)
            setCity(todoData.city);
            setCompany(todoData.company);
            setDisplayDate(todoData.displayDate);
            setExecutionDate(todoData.executionDate);
            setObservation(todoData.observation);
            setColor(todoData.color);
        }
        return () => {
            clearTodoForm();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId]);

    const saveTodo = async () => {
        try {
            await updateTodo(selectedId, {
                status,
                statusId,
                city,
                company,
                userEmail,
                displayDate,
                executionDate,
                observation,
                color,
            });
            toast({
                title: "Registro atualizado com sucesso!",
                status: "success",
                duration: 1000,
            });
            onClose();
        } catch (error) {
            console.error(error);
            toast({
                title: "Erro em atualizar registro",
                status: "error",
            });
        }
    };



    const handleTodoCreate = async () => {
        setIsLoading(true);

        const todo = {
            status,
            statusId,
            userId: user.uid,
            city,
            company,
            userEmail,
            displayDate,
            executionDate,
            observation,
            color,
        };

        try {
            await addTodo(todo);
            onClose();
            clearTodoForm();

            toast({ title: "Registro criado com Sucesso", status: "success", duration: 1000 });
        } catch (error) {
            console.error(error);
            toast({ title: "Erro ao criar o registro", status: "error" });
        } finally {
            setIsLoading(false);
        }
    }

    function clearTodoForm() {
        setStatus("");
        setStatusId("");
        setCity("");
        setUserEmail("");
        setCompany("");
        setDisplayDate("");
        setExecutionDate("");
        setObservation("");
        setColor("blue");
    }

    function statusHandler(statusId, status) {
        if (!statusId) {
            const option = statusOptions.find(option => {
                const statusA = option.status.toLocaleUpperCase('pt-BR').trim()
                const statusB = status.toLocaleUpperCase('pt-BR').trim()
                if (statusA === statusB) {
                    return option
                }
                return false
            })
            if (option) return option.statusId
            return ""
        }
        return statusId
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent style={{ marginTop: 0, marginBottom: 0, margin: 'auto' }}>
                <ModalHeader display="flex " alignItems="center" gap={2}>
                    {isEdit ? "Editar Registro" : "Criar Registro"}
                    <Text color="red.200" fontSize={10}> *Obrigatório</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack direction="column">
                        <FormInput value={userEmail} inputprops={{ maxLength: 50 }} label={"Email do Cliente"} setValue={setUserEmail} isRequired />
                        <FormInput value={city} inputprops={{ maxLength: 50 }} label={"Cidade"} setValue={setCity} isRequired />
                        <FormInput value={company} inputprops={{ maxLength: 50 }} label={"Empresa"} setValue={setCompany} isRequired />
                        <Box display="flex" gap={2} alignItems="center">
                            <Box display="flex" gap={2} width="100%" flexDirection="column">
                                <Text fontSize="sm">
                                    Status <span style={{ color: '#feb2b2' }}>*</span>
                                </Text>
                                <Select
                                    data-testid="status"
                                    value={statusId}
                                    onChange={(e) => {
                                        setStatus(statusMap[e.target.value].status);
                                        setStatusId(e.target.value);
                                    }}
                                >
                                    {statusOptions.map((option) =>
                                        <option key={option.statusId} value={option.statusId} style={{ fontWeight: "bold" }}>
                                            {option.status}
                                        </option>
                                    )}
                                </Select>
                            </Box>
                            <FormInput value={displayDate} label={"Data de Realização"} setValue={setDisplayDate} type="date" isRequired />
                        </Box>
                        <FormInput value={executionDate} label={"Data de Exibição"} setValue={setExecutionDate} />
                        <FormInput value={observation} label={"Observação"} setValue={setObservation} type="textarea" />
                        <Text fontSize="sm">Cor</Text>
                        <RadioGroup value={color} onChange={(e) => setColor(e)}>
                            <Stack direction="row">
                                {colorOptions.map(color =>
                                    <Radio
                                        data-testid={color.value}
                                        key={color.value}
                                        value={color.value}
                                        colorScheme={color.value === "white" ? "gray" : color.value}
                                    >
                                        {color.label}
                                    </Radio>
                                )}
                            </Stack>
                        </RadioGroup>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        data-testid="salvar"
                        isLoading={isLoading}
                        onClick={() => {
                            if (selectedId) saveTodo();
                            else handleTodoCreate();
                        }}
                        isDisabled={!isFormValid}
                        variant="solid"
                    >
                        Salvar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    );
}
