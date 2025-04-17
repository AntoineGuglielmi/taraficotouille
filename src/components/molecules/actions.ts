'use server'

import { removeAudio } from '@/services/ServiceAudioStorage'
import { deleteEntry, removeAudioIdFromEntry } from '@/services/ServiceEntries'
import { TypeEntryRefined } from '@/types/TypeEntryRefined'
import { revalidatePath } from 'next/cache'

export const deleteEntryAction = async ({
  id,
}: {
  id: TypeEntryRefined['id']
}) => {
  await deleteEntry({ id })
}

export const removeAudioAction = async ({
  audioId,
  entryId,
}: {
  audioId: string
  entryId: TypeEntryRefined['id']
}) => {
  await removeAudio({
    audioId,
  })
  await removeAudioIdFromEntry({
    audioId,
    entryId,
  })
  revalidatePath('/')
}
