import AddEntryForm from '@/components/molecules/add-entry-form'
// import { getAllEntries } from '@/services/ServiceEntries'

export default async function Home() {
  // const entries = await getAllEntries()
  return (
    <main>
      <AddEntryForm />
    </main>
  )
}
