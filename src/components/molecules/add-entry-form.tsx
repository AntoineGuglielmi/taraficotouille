import Form from 'next/form'

type AddEntryFormProps = {
  className?: string
  children?: React.ReactNode
}

export default function AddEntryForm({ className }: AddEntryFormProps) {
  const submitForm = async (formData: FormData) => {
    'use server'
    console.log('Form submitted:', formData)
    // You can access form data using formData.get('fieldName')
    // Perform any necessary actions, such as saving data to a database
  }

  return (
    <Form
      action={submitForm}
      className={`max-w-prose mx-auto flex flex-col gap-4 ${className}`}
    >
      <input
        type="text"
        name="entry"
        placeholder="Crapeniguedouille"
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
