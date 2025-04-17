import { getUserById, updateUserById } from '@/services/ServiceUsers'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function MiddlewareAdminify(request: NextRequest) {
  const { pathname } = request.nextUrl
  const regex = /^\/adminify\/([^/]+)$/
  const match = pathname.match(regex)
  const id = match ? match[1] : ''

  const cookiesStore = await cookies()

  const user = await getUserById({ id })

  if (user) {
    cookiesStore.set('TARAFICOTOUILLE_USER_ID', user.$id, {
      expires: new Date(Date.now() + 365 /*nb d ejours*/ * 24 * 60 * 60 * 1000),
    })
    await updateUserById({
      id,
      activated: true,
    })
  }

  return NextResponse.redirect(new URL('/', request.url))
}
