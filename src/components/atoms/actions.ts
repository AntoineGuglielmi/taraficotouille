'use server'

import { createAudio } from '@/services/ServiceAudioStorage'
import { addAudioIdToEntry } from '@/services/ServiceEntries'
import { getUserById } from '@/services/ServiceUsers'
import { TypeEntryRefined } from '@/types/TypeEntryRefined'
import { revalidatePath } from 'next/cache'

export const getUserTypeAction = async ({
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

export const createAudioAction = async ({
  audioFile,
  entryId,
}: {
  audioFile: File
  entryId: TypeEntryRefined['id']
}) => {
  const audioId = await createAudio({ audioFile })
  await addAudioIdToEntry({
    entryId,
    audioId,
  })
  revalidatePath('/')
}
