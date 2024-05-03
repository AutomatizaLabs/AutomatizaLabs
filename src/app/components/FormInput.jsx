import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react"; // Importe o useState

export default function FormInput({
  label,
  value,
  setValue,
  type = "text",
  isRequired,
  inputprops,
  setEditedTask,
  editedKey,
}) {
  const [isError, setIsError] = useState(false); // Estado para controlar o erro

  const handleInputChange = (e) => {
    if (setValue) setValue(e.target.value);
    else setEditedTask((prev) => ({ ...prev, [editedKey]: e.target.value }));
    setIsError(false); // Reseta o erro ao digitar
  };

  const handleBlur = () => {
    // Verifica se o campo está vazio quando o usuário sai do campo
    if (isRequired && value === "") {
      setIsError(true); // Configura o erro se necessário
    }
  };

  return (
    <FormControl isRequired={isRequired} isInvalid={isError}>
      <FormLabel fontSize={"sm"}>{label}</FormLabel>
      {
        type === "textarea" ?
          <Textarea {...inputprops}
            data-testid={label}
            placeholder={label}
            value={value}
            color={"black"}
            onChange={handleInputChange}
            onBlur={handleBlur} /> :
          <Input
            {...inputprops}
            data-testid={label}
            placeholder={label}
            type={type}
            color={"black"}
            value={value}
            onChange={handleInputChange}
            onBlur={handleBlur} // Adiciona o onBlur handler
          />
      }
    </FormControl>
  );
}
