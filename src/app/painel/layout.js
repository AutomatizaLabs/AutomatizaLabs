import { Inter } from 'next/font/google'
import ModalContextProvider from '../contexts/ModalContext'
import { ChakraProvider } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AutomatizaLabs',
  description: 'Soluções em Softwere',
}

export default function RootLayout({ children }) {
  return (
    <>
      <ChakraProvider>
        
    <body className={inter.className}>{children}</body>
      </ChakraProvider>
    </>
  )
}
