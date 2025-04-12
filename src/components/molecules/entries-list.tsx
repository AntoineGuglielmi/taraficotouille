'use client'

import EntryItem from '../atoms/entry-item'
import { useEffect, useState } from 'react'
import { TypeEntryRefined } from '@/types/TypeEntryRefined'

type EntriesListProps = {
  className?: string
  children?: React.ReactNode
}

export default function EntriesList({ className }: EntriesListProps) {
  const [entries, setEntries] = useState<TypeEntryRefined[]>([])
  const [search, setSearch] = useState<string>('')
  const [debouncedSearch, setDebouncedSearch] = useState<string>('')

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [search])

  useEffect(() => {
    const fetchEntries = async () => {
      const res = await fetch('/api/entries')
      const data = await res.json()
      setEntries(data)
    }

    fetchEntries()
  }, [])

  useEffect(() => {
    const fetchFiltered = async () => {
      if (search.trim() === '') {
        const res = await fetch('/api/entries')
        const data = await res.json()
        setEntries(data)
      } else {
        const res = await fetch(
          `/api/entries?search=${encodeURIComponent(search)}`,
        )
        const data = await res.json()
        setEntries(data)
      }
    }

    if (debouncedSearch) {
      fetchFiltered()
    }
  }, [search, debouncedSearch])

  return (
    <section className={`w-full max-w-prose flex flex-col gap-4 ${className}`}>
      <input
        type="search"
        onChange={(event) => setSearch(event.target.value)}
        className="bg-amber-500 shadow-[0_0_1rem_0_rgba(0,0,0,0.75)] text-white text-2xl placeholder:text-white/75 px-4 py-2 rounded-md w-full font-cute"
        placeholder="Chercher un mot..."
      />
      <ul className="w-full flex flex-col gap-4">
        {entries.map((entry) => (
          <li key={entry.id}>
            <EntryItem entry={entry} />
          </li>
        ))}
      </ul>
    </section>
  )
}
