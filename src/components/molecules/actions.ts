'use server'

import { deleteEntry } from '@/services/ServiceEntries'
import { TypeEntryRefined } from '@/types/TypeEntryRefined'

export const deleteEntryAction = async ({
  id,
}: {
  id: TypeEntryRefined['id']
}) => {
  await deleteEntry({ id })
}
