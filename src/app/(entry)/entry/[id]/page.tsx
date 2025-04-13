import EditEntryForm from '@/components/molecules/edit-entry-form'
import { getEntryById } from '@/services/ServiceEntries'
import Link from 'next/link'

type IdPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function IdPage({ params }: IdPageProps) {
  const { id } = await params
  const entry = await getEntryById({ id })

  return (
    <section className="flex flex-col gap-4 w-full max-w-prose items-center justify-center">
      <Link
        href={'/'}
        className="text-amber-500 button-primary bg-white mr-auto"
      >
        Retour au dictionnaire
      </Link>
      <EditEntryForm entry={entry} />
    </section>
  )
}
