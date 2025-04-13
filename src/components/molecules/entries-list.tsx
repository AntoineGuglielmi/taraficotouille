/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import EntryItem from '../atoms/entry-item'
import { useEffect, useState } from 'react'
import { TypeEntryRefined } from '@/types/TypeEntryRefined'
import useDebounce from '@/hooks/useDebounce'

type EntriesListProps = {
  className?: string
  children?: React.ReactNode
  entries: TypeEntryRefined[]
}

export default function EntriesList({ className, entries }: EntriesListProps) {
  // const [entries, setEntries] = useState<TypeEntryRefined[]>([])
  const [search, setSearch] = useState<string>('')
  const [filteredEntries, setFilteredEntries] =
    useState<TypeEntryRefined[]>(entries)

  const debouncedSearch = useDebounce(search, 500)

  const fetchFiltered = async () => {
    const res = await fetch(
      `/api/entries?search=${encodeURIComponent(debouncedSearch)}`,
    )
    const data = await res.json()
    setFilteredEntries(data)
  }

  useEffect(() => {
    fetchFiltered()
  }, [debouncedSearch, entries])

  return (
    <section className={`w-full max-w-prose flex flex-col gap-4 ${className}`}>
      <input
        type="search"
        onChange={(event) => setSearch(event.target.value)}
        className="bg-yellow-500 shadow-[0_0_1rem_0_rgba(0,0,0,0.75)] text-white text-2xl placeholder:text-white/75 px-4 py-2 rounded-md w-full font-cute"
        placeholder="Chercher un mot ou une définition..."
      />
      <ul className="w-full flex flex-col gap-4">
        {filteredEntries.map((entry) => (
          <li key={entry.id}>
            <EntryItem entry={entry} />
          </li>
        ))}
      </ul>
    </section>
  )
}
