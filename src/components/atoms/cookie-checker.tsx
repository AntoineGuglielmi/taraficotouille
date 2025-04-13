'use client'

import { useEffect, useState } from 'react'
import { getUserType } from './actions'

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
  const [isAllowed, setIsAllowed] = useState<boolean>(false)

  useEffect(() => {
    const fetchUserType = async () => {
      const cookies = document.cookie
      const match = cookies.match(/TARAFICOTOUILLE_USER_ID=([^;]+)/)
      const id = match?.[1] ?? ''

      if (!id) return

      try {
        const userType = (await getUserType({ id })) ?? ''
        setIsAllowed(showIf.includes(userType) && !hideIf.includes(userType))
      } catch {}
    }
    fetchUserType()
  }, [])

  if (!isAllowed) return null

  return <>{children}</>

  return null
}
