import { rawToRefined } from '@/adapters/AdapterEntries'
import { TypeEntryRaw } from '@/types/TypeEntryRaw'
import { TypeEntryRefined } from '@/types/TypeEntryRefined'
import { Client, Databases, ID } from 'node-appwrite'

const client = new Client()

const {
  AW_ENDPOINT,
  AW_PROJECT_ID,
  AW_SECRET_KEY,
  AW_DATABASE_ID,
  AW_COLLECTION_ENTRIES_ID,
} = process.env

client
  .setEndpoint(AW_ENDPOINT!)
  .setProject(AW_PROJECT_ID!)
  .setKey(AW_SECRET_KEY!)

const databases = new Databases(client)

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
      AW_COLLECTION_ENTRIES_ID!,
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
      AW_COLLECTION_ENTRIES_ID!,
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
