/* eslint-disable react/no-unescaped-entities */
import { TypeEntryRefined } from '@/types/TypeEntryRefined'
import { Pencil } from 'lucide-react'
import Link from 'next/link'
import CookieChecker from './cookie-checker'

type EntryItemProps = {
  className?: string
  children?: React.ReactNode
  entry: TypeEntryRefined
}

export default function EntryItem({ className, entry }: EntryItemProps) {
  const { id, title, definition, date } = entry
  const formattedDate = new Date(date).toLocaleDateString('fr-FR')
  return (
    <div
      className={`bg-white/85 text-foreground p-8 rounded-md text-left flex flex-col gap-2 ${className}`}
    >
      <header className="flex justify-between items-center">
        <h3 className="typeface-entry-title text-amber-500">{title}</h3>

        <CookieChecker showIf={['admin']}>
          <Link href={`/entry/${id}`}>
            <Pencil />
          </Link>
        </CookieChecker>
      </header>
      <p className="text-xs">Inventé le {formattedDate}</p>
      {definition && <p className="italic">"{definition}"</p>}
    </div>
  )
}
