'use client'

import { usePermission } from '@/stores/UsePermission'

type Props = {
  children: React.ReactNode
  showIf?: string[]
  hideIf?: string[]
}

export default function UserPermission({
  children,
  showIf = [],
  hideIf = [],
}: Props) {
  const userType = usePermission((state) => state.userType)

  if (!userType) return null // ou spinner
  const isAllowed = showIf.includes(userType) && !hideIf.includes(userType)

  return isAllowed ? <>{children}</> : null
}
