import UserPermission from '@/components/atoms/user-permission'
import Header from '@/components/layers/header'
import AdminNav from '@/components/molecules/admin-nav'

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <UserPermission showIf={['admin']}>
        <AdminNav />
      </UserPermission>
      <Header />
      <main className="flex flex-col gap-30 items-center">{children}</main>
    </>
  )
}
