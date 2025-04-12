/* eslint-disable react/no-unescaped-entities */
import { TypeEntryRefined } from '@/types/TypeEntryRefined'

type EntryItemProps = {
  className?: string
  children?: React.ReactNode
  entry: TypeEntryRefined
}

export default function EntryItem({ className, entry }: EntryItemProps) {
  const { title, definition, date } = entry
  const formattedDate = new Date(date).toLocaleDateString('fr-FR')
  return (
    <div
      className={`bg-white text-gray-700 p-8 rounded-md text-left flex flex-col gap-2 ${className}`}
    >
      <h3 className="typeface-entry-title text-amber-500">{title}</h3>
      <p className="text-xs">Inventé le {formattedDate}</p>
      {definition && <p className="italic">"{definition}"</p>}
    </div>
  )
}
