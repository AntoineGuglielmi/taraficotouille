import { NextResponse } from 'next/server'
import { getEntryBySearch } from '@/services/ServiceEntries'

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
