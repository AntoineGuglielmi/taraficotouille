import EditEntryForm from '@/components/molecules/edit-entry-form'
import { getEntryById } from '@/services/ServiceEntries'
import { Home } from 'lucide-react'
import Link from 'next/link'

type IdPageProps = {
  params: {
    id: string
  }
}

export default async function IdPage({ params }: IdPageProps) {
  const { id } = await params
  const entry = await getEntryById({ id })

  return (
    <section className="flex flex-col gap-4 w-full max-w-prose items-center justify-center">
      <Link
        href={'/'}
        className="text-white"
      >
        <Home size={50} />
      </Link>
      <EditEntryForm entry={entry} />
    </section>
  )
}
