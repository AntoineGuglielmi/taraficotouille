import { userAvailable } from '@/services/ServiceUsers'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function MiddlewareAdminify(request: NextRequest) {
  const { pathname } = request.nextUrl
  const regex = /^\/adminify\/([^/]+)$/
  const match = pathname.match(regex)
  const id = match ? match[1] : ''

  const cookiesStore = await cookies()

  const userType = await userAvailable({
    id,
  })

  if (userType) {
    cookiesStore.set('TARAFICOTOUILLE_USER', userType)
  }

  return NextResponse.redirect(new URL('/', request.url))
}
