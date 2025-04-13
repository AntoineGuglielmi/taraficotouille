import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function MiddlewarePermission(request: NextRequest) {
  const cookiesStore = await cookies()
  const isAllowed = ['admin', 'writer'].includes(
    cookiesStore.get('TARAFICOTOUILLE_USER')?.value ?? '',
  )
  if (!isAllowed) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}
