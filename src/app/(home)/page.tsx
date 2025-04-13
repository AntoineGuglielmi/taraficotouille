import AddEntryForm from '@/components/molecules/add-entry-form'
import EntriesList from '@/components/molecules/entries-list'
import { getAllEntries } from '@/services/ServiceEntries'

export default async function Home() {
  const entries = await getAllEntries()

  return (
    <>
      <AddEntryForm />
      <EntriesList entries={entries} />
    </>
  )
}
