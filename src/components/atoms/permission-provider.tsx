'use client'

import { useEffect } from 'react'
import { usePermission } from '@/stores/UsePermission'
import { getUserTypeAction } from './actions'

export default function PermissionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const setUserType = usePermission((state) => state.setUserType)

  useEffect(() => {
    const run = async () => {
      const cookies = document.cookie
      const match = cookies.match(/TARAFICOTOUILLE_USER_ID=([^;]+)/)
      const id = match?.[1] ?? ''
      if (!id) return
      try {
        const userType = await getUserTypeAction({ id })
        setUserType(userType ?? '')
      } catch {}
    }

    run()
  }, [setUserType])

  return <>{children}</>
}
