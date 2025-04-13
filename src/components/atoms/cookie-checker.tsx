'use client'

import { useEffect, useState } from 'react'

type CookieCheckerProps = {
  children?: React.ReactNode
  showIf?: Array<string>
  hideIf?: Array<string>
}

export default function CookieCheckerClient({
  children,
  showIf = [],
  hideIf = [],
}: CookieCheckerProps) {
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    const cookies = document.cookie
    const match = cookies.match(/TARAFICOTOUILLE_USER=([^;]+)/)
    const value = match?.[1] ?? ''
    setUser(value)
  }, [])

  if (!user) return null

  if (showIf.includes(user) && !hideIf.includes(user)) {
    return <>{children}</>
  }

  return null
}
