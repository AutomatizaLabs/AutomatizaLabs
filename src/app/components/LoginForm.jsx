'use client'
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useToast,
} from '@chakra-ui/react'
import { PasswordField } from './PasswordField'
import { useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const toast = useToast();
    const router = useRouter();

    async function handleLogin() {
        try {
            const user = await signInWithEmailAndPassword(auth, emailRef.current.value, passRef.current.value)
            if (user)
                 router.push("/adminpanel")
        } catch (error) {
            toast({
                description: "Não foi possível autenticar",
                title: "Falha",
                duration: 3000,
                status: "error"
            })
        }
    }

    return (
        <Box
            h="100vh"
            bg="blue.200"
            color="black"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Container maxW="lg">
                <Stack spacing="8">
                    <Stack spacing="6">
                        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                            <Heading size={{ base: 'xs', md: 'sm' }}>Painel Administrador</Heading>
                        </Stack>
                    </Stack>
                    <Box
                        py={{ base: '0', sm: '8' }}
                        px={{ base: '4', sm: '10' }}
                        bg="white"
                        boxShadow="lg"
                        borderRadius="xl"
                    >
                        <form onSubmit={(e) => e.preventDefault()}>
                            <Stack spacing="6">
                                <Stack spacing="5">
                                    <FormControl>
                                        <FormLabel htmlFor="email">E-mail</FormLabel>
                                        <Input data-testid="email-input" id="email" type="email" ref={emailRef} />
                                    </FormControl>
                                    <PasswordField data-testid="senha-input" ref={passRef} />
                                </Stack>
                                <Stack spacing="6">
                                    <Button colorScheme="blue" data-testid="login" type="submit" onClick={handleLogin}>Autenticar</Button>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}
