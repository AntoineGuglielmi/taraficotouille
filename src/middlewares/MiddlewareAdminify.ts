import { userAvailable } from '@/services/ServiceUsers'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function MiddlewareAdminify(request: NextRequest) {
  const { pathname } = request.nextUrl
  const regex = /^\/adminify\/([^/]+)$/
  const match = pathname.match(regex)
  const id = match ? match[1] : ''
  console.log({
    id,
  })

  const cookiesStore = await cookies()
  const isUserAvailable = await userAvailable({
    type: 'admin',
    id,
  })
  if (isUserAvailable) {
    cookiesStore.set('TARAFICOTOUILLE_USER', 'admin')
  }
  return NextResponse.redirect(new URL('/', request.url))
}
