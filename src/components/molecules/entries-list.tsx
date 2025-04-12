import { getAllEntries } from '@/services/ServiceEntries'
import EntryItem from '../atoms/entry-item'

type EntriesListProps = {
  className?: string
  children?: React.ReactNode
}

export default async function EntriesList({ className }: EntriesListProps) {
  const entries = await getAllEntries()

  return (
    <ul className={`w-full max-w-prose ${className}`}>
      {entries.map((entry) => (
        <li key={entry.id}>
          <EntryItem entry={entry} />
        </li>
      ))}
    </ul>
  )
}
