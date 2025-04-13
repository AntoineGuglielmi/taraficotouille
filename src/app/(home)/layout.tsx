import CookieChecker from '@/components/atoms/cookie-checker'
import Header from '@/components/layers/header'
import AdminNav from '@/components/molecules/admin-nav'

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <CookieChecker showIf={['admin']}>
        <AdminNav />
      </CookieChecker>
      <Header />
      <main className="flex flex-col gap-30 items-center">{children}</main>
    </>
  )
}
