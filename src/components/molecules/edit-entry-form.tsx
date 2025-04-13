/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { TypeEntryRefined } from '@/types/TypeEntryRefined'
import useDebounce from '@/hooks/useDebounce'
import useEffectAfterFirstRender from '@/hooks/useEffectAfterFirstRender'
import { useRouter } from 'next/navigation'
import { deleteEntryAction } from './actions'

type EditEntryFormProps = {
  className?: string
  children?: React.ReactNode
  entry: TypeEntryRefined
}

export default function EditEntryForm({
  className,
  entry,
}: EditEntryFormProps) {
  const router = useRouter()
  const { id, title, definition, date } = entry
  const formattedDate = new Date(date).toLocaleDateString('fr-FR')
  const [showMoreOption, setShowMoreOption] = useState(false)

  const [inputTitle, setInputTitle] = useState<string>(title)
  const [inputDefinition, setInputDefinition] = useState<string>(
    definition ?? '',
  )

  const debouncedTitle = useDebounce(inputTitle, 500)
  const debouncedDefinition = useDebounce(inputDefinition, 500)

  useEffectAfterFirstRender(() => {
    fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: debouncedTitle, id }),
    })
  }, [debouncedTitle, id])

  useEffectAfterFirstRender(() => {
    fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ definition: debouncedDefinition, id }),
    })
  }, [debouncedDefinition, id])

  const handleDeleteButton = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
    event.stopPropagation()
    const confirmed = confirm('Êtes-vous sûr de vouloir désinventer ce mot ?')
    if (confirmed) {
      await deleteEntryAction({ id })
      router.push('/')
    }
  }

  return (
    <form className={`flex flex-col gap-4 w-full ${className}`}>
      <input
        type="text"
        name="entry"
        onChange={(event) => setInputTitle(event.target.value)}
        value={inputTitle}
        className="input-field bg-amber-500 text-white text-2xl placeholder:text-white/75 font-cute"
      />
      <p className="text-xs text-white font-[700]">
        Inventé le {formattedDate}
      </p>
      <textarea
        name="definition"
        value={inputDefinition}
        onChange={(event) => setInputDefinition(event.target.value)}
        placeholder="Ça veut dire..."
        className="input-field bg-white text-foreground placeholder:text-foreground/75 field-sizing-content min-h-[80px]"
      />
      {!showMoreOption && (
        <button
          className="text-white underline mr-auto font-[700]"
          onClick={() => setShowMoreOption(!showMoreOption)}
        >
          Voir plus d'options
        </button>
      )}
      {showMoreOption && (
        <>
          <button
            className="button-primary ml-auto bg-violet-300 text-violet-900"
            onClick={handleDeleteButton}
          >
            Désinventer
          </button>
        </>
      )}
    </form>
  )
}
