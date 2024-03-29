import { Zen_Kaku_Gothic_New } from 'next/font/google' 
import './globals.css'

const notojp = Zen_Kaku_Gothic_New({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

{/*font変更
import { Inter } from 'next/font/google'
*const inter = Inter({ subsets: ['latin'] })*/}

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={notojp.className}>{children}</body>
    </html>
  )
}
