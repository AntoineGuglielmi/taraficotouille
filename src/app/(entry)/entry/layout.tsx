export default function EditEntryLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <main className="flex pt-30 flex-col gap-30 items-center">
        {children}
      </main>
    </>
  )
}
