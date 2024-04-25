import { Inter } from 'next/font/google'
import ModalContextProvider from '../contexts/ModalContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AutomatizaLabs',
  description: 'Soluções em Softwere',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={inter.className}>{children}</body>
  </html>
  )
}
