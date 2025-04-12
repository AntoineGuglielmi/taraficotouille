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
        className="bg-amber-500 shadow-[0_0_1rem_0_rgba(0,0,0,0.75)] text-white text-2xl placeholder:text-white/75 px-4 py-2 rounded-md w-full font-cute"
      />
      <button
        type="submit"
        className="bg-white text-amber-500 font-[700] text-xl px-4 py-2 rounded-md ml-auto"
      >
        Ajouter
      </button>
    </Form>
  )
}
