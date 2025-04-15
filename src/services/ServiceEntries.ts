import { rawToRefined } from '@/adapters/AdapterEntries'
import { TypeEntryRaw } from '@/types/TypeEntryRaw'
import { TypeEntryRefined } from '@/types/TypeEntryRefined'
import { ID, Query } from 'node-appwrite'
import { databases } from './init'

const { AW_DATABASE_ID, AW_ENTRIES_COLLECTION_ID } = process.env

export const createEntry = async ({
  title,
}: {
  title: TypeEntryRefined['title']
}) => {
  const entry = {
    title,
  }

  try {
    const response = await databases.createDocument(
      AW_DATABASE_ID!,
      AW_ENTRIES_COLLECTION_ID!,
      ID.unique(),
      entry,
    )
    return response
  } catch (error) {
    console.error('Error creating entry:', error)
    throw error
  }
}

export const getAllEntries = async () => {
  try {
    const response = await databases.listDocuments(
      AW_DATABASE_ID!,
      AW_ENTRIES_COLLECTION_ID!,
      [Query.orderDesc('$createdAt')],
    )
    const documents = (response.documents as TypeEntryRaw[]).map(
      (doc: TypeEntryRaw) => {
        return rawToRefined(doc)
      },
    )
    return documents
  } catch (error) {
    console.error('Error fetching entries:', error)
    throw error
  }
}

export const getEntryBySearch = async ({ search }: { search: string }) => {
  try {
    const response = await databases.listDocuments(
      AW_DATABASE_ID!,
      AW_ENTRIES_COLLECTION_ID!,
      [
        Query.orderDesc(`$createdAt`),
        ...(search
          ? [
              Query.or([
                Query.contains('title', search),
                Query.contains('definition', search),
              ]),
            ]
          : []),
      ],
    )
    const documents = (response.documents as TypeEntryRaw[]).map(
      (doc: TypeEntryRaw) => {
        return rawToRefined(doc)
      },
    )
    return documents
  } catch (error) {
    console.error('Error fetching entries:', error)
    throw error
  }
}

export const getEntryById = async ({ id }: { id: string }) => {
  try {
    const response = await databases.getDocument(
      AW_DATABASE_ID!,
      AW_ENTRIES_COLLECTION_ID!,
      id,
    )
    const document = rawToRefined(response as TypeEntryRaw)
    return document
  } catch (error) {
    console.error('Error fetching entry:', error)
    throw error
  }
}

export const updateEntry = async ({
  id,
  title,
  definition,
  audiosId,
}: {
  id: TypeEntryRefined['id']
  title?: TypeEntryRefined['title']
  definition?: TypeEntryRefined['definition']
  audiosId?: TypeEntryRefined['audiosId']
}) => {
  const entry = {
    ...(title !== undefined ? { title } : {}),
    ...(definition !== undefined ? { definition } : {}),
    ...(audiosId !== undefined ? { audiosId } : {}),
  }

  try {
    const response = await databases.updateDocument(
      AW_DATABASE_ID!,
      AW_ENTRIES_COLLECTION_ID!,
      id,
      entry,
    )
    return response
  } catch (error) {
    console.error('Error updating entry:', error)
    throw error
  }
}

export const deleteEntry = async ({ id }: { id: TypeEntryRefined['id'] }) => {
  try {
    const response = await databases.deleteDocument(
      AW_DATABASE_ID!,
      AW_ENTRIES_COLLECTION_ID!,
      id,
    )
    return response
  } catch (error) {
    console.error('Error deleting entry:', error)
    throw error
  }
}

export const addAudioIdToEntry = async ({
  entryId,
  audioId,
}: {
  entryId: TypeEntryRefined['id']
  audioId: string
}) => {
  const currentAudiosId = (
    await databases.getDocument(
      AW_DATABASE_ID!,
      AW_ENTRIES_COLLECTION_ID!,
      entryId,
    )
  ).audiosId

  const updatedAudiosId = [...new Set([...currentAudiosId, audioId])]

  await updateEntry({
    id: entryId,
    audiosId: updatedAudiosId,
  })
}

export const removeAudioIdFromEntry = async ({
  entryId,
  audioId,
}: {
  entryId: TypeEntryRefined['id']
  audioId: string
}) => {
  const currentAudiosId = (
    await databases.getDocument(
      AW_DATABASE_ID!,
      AW_ENTRIES_COLLECTION_ID!,
      entryId,
    )
  ).audiosId

  const updatedAudiosId = currentAudiosId.filter(
    (_audioId: string) => _audioId !== audioId,
  )

  await updateEntry({
    id: entryId,
    audiosId: updatedAudiosId,
  })
}
