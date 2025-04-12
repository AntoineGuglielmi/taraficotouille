import { NextResponse } from 'next/server'
import { getEntryBySearch, updateEntry } from '@/services/ServiceEntries'
import { TypeEntryRefined } from '@/types/TypeEntryRefined'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''

  try {
    const results = await getEntryBySearch({ search })
    return NextResponse.json(results)
  } catch (error) {
    console.error('Error fetching entries:', error)
    return new NextResponse('Erreur serveur', { status: 500 })
  }
}

export async function POST(req: Request) {
  const body = await req.json()
  const {
    title,
    definition,
    id,
  }: {
    title: TypeEntryRefined['title']
    definition: TypeEntryRefined['definition']
    id: TypeEntryRefined['id']
  } = body

  const results = await updateEntry({
    title,
    definition,
    id,
  })

  return NextResponse.json(results)
}
