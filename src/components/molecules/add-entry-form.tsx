import { createEntry } from '@/services/ServiceEntries'
import { revalidatePath } from 'next/cache'
import Form from 'next/form'

type AddEntryFormProps = {
  className?: string
  children?: React.ReactNode
}

export default function AddEntryForm({ className }: AddEntryFormProps) {
  const submitForm = async (formData: FormData) => {
    'use server'
    const title = formData.get('entry') as string
    await createEntry({ title })
    revalidatePath('/')
  }

  return (
    <Form
      action={submitForm}
      className={`w-full max-w-prose mx-auto flex flex-col gap-4 ${className}`}
    >
      <input
        type="text"
        name="entry"
        placeholder="Inventer un mot..."
        className="input-field bg-yellow-500 text-white text-2xl placeholder:text-white/75 font-cute"
      />
      <button
        type="submit"
        className="button-primary ml-auto"
      >
        Ajouter
      </button>
    </Form>
  )
}
