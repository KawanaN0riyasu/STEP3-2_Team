import { Zen_Kaku_Gothic_New } from 'next/font/google' //font変えました！
import './globals.css'

const notojp = Zen_Kaku_Gothic_New({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: 'もぐもぐ図鑑',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    
    <html lang="ja">
      <body className={notojp.className}>
        {children}
        </body>
    </html>
    
  )
}

