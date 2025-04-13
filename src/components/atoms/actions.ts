'use server'

import { getUserById } from '@/services/ServiceUsers'

export const getUserType = async ({
  id,
}: {
  id: string
}): Promise<string | null> => {
  const user = await getUserById({ id })
  if (user) {
    return user.type
  }
  return null
}
