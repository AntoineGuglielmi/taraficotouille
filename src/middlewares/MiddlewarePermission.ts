import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function MiddlewarePermission(request: NextRequest) {
  const cookiesStore = await cookies()
  const idAdmin = cookiesStore.get('TARAFICOTOUILLE_USER')?.value === 'admin'
  if (!idAdmin) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}
