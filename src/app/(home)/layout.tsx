import Header from '@/components/layers/header'

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-30 items-center">{children}</main>
    </>
  )
}
