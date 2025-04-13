import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { MiddlewareAdminify } from './middlewares/MiddlewareAdminify'
import { MiddlewarePermission } from './middlewares/MiddlewarePermission'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/adminify')) {
    const middleAdminify = await MiddlewareAdminify(request)
    if (middleAdminify !== NextResponse.next()) {
      return middleAdminify
    }
  }

  if (pathname.startsWith('/entry')) {
    const middlewarePermission = await MiddlewarePermission(request)
    if (middlewarePermission !== NextResponse.next()) {
      return middlewarePermission
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
