import UserPermission from '@/components/atoms/user-permission'
import AddEntryForm from '@/components/molecules/add-entry-form'
import EntriesList from '@/components/molecules/entries-list'
import { getAllEntries } from '@/services/ServiceEntries'

export default async function Home() {
  const entries = await getAllEntries()

  return (
    <>
      <UserPermission showIf={['admin', 'writer']}>
        <AddEntryForm />
      </UserPermission>
      <EntriesList entries={entries} />
    </>
  )
}
