import { getUserById } from '@/services/ServiceUsers'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function MiddlewarePermission(request: NextRequest) {
  const cookiesStore = await cookies()
  const userId = cookiesStore.get('TARAFICOTOUILLE_USER_ID')?.value ?? ''
  const user = await getUserById({ id: userId })
  const userType = user?.type ?? ''

  const isAllowed = ['admin', 'writer'].includes(userType)

  if (!isAllowed) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
