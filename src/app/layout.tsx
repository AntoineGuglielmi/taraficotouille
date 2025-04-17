import { Vibur, Nunito } from 'next/font/google'
import './globals.css'
import BgColor from '@/components/atoms/bg-color'
import { Metadata } from 'next'
import PermissionProvider from '@/components/atoms/permission-provider'

const nunito = Nunito({
  variable: '--font-nunito',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  subsets: ['latin'],
})

const vibur = Vibur({
  variable: '--font-vibur',
  weight: ['400'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Taraficotouille',
  description: 'Un dictionnaire qui rassemble tous les mots inventés par Léo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${vibur.variable} antialiased min-h-[100svh] px-4 pb-30 font-body relative`}
      >
        <BgColor />
        <PermissionProvider>{children}</PermissionProvider>
      </body>
    </html>
  )
}
