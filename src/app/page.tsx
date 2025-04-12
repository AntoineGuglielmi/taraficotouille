import AddEntryForm from '@/components/molecules/add-entry-form'
import EntriesList from '@/components/molecules/entries-list'

export default function Home() {
  return (
    <main className="flex flex-col gap-30 items-center">
      <AddEntryForm />
      <EntriesList />
    </main>
  )
}
