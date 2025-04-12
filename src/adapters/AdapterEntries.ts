import { TypeEntryRaw } from '@/types/TypeEntryRaw'
import { TypeEntryRefined } from '@/types/TypeEntryRefined'

export const rawToRefined = (rawEntry: TypeEntryRaw): TypeEntryRefined => {
  const { $id: id, title, definition, $createdAt: date } = rawEntry
  return {
    id,
    title,
    definition,
    date,
  }
}
