import UserPermission from '@/components/atoms/user-permission'
import AddEntryForm from '@/components/molecules/add-entry-form'
import EntriesList from '@/components/molecules/entries-list'
import { getAudiosBatch } from '@/services/ServiceAudioStorage'
import { getAllEntries } from '@/services/ServiceEntries'

export default async function Home() {
  const entries = await getAllEntries()
  const audios = []
  for (const { audiosId } of entries) {
    const audiosBatch = await getAudiosBatch({ audiosId })
    audios.push(audiosBatch)
  }

  return (
    <>
      <UserPermission showIf={['admin', 'writer']}>
        <AddEntryForm />
      </UserPermission>
      <EntriesList
        entries={entries}
        audios={audios}
      />
    </>
  )
}
