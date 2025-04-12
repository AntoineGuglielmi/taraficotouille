import { rawToRefined } from '@/adapters/AdapterEntries'
import { TypeEntryRaw } from '@/types/TypeEntryRaw'
import { TypeEntryRefined } from '@/types/TypeEntryRefined'
import { Client, Databases, ID, Query } from 'node-appwrite'

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
  console.log({
    search,
  })
  try {
    const response = await databases.listDocuments(
      AW_DATABASE_ID!,
      AW_COLLECTION_ENTRIES_ID!,
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
    console.log({
      documents,
      search,
    })
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
      AW_COLLECTION_ENTRIES_ID!,
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
}: {
  id: TypeEntryRefined['id']
  title: TypeEntryRefined['title']
  definition: TypeEntryRefined['definition']
}) => {
  const entry = {
    ...(title ? { title } : {}),
    ...(definition ? { definition } : {}),
  }
  console.log({
    id,
    title,
    definition,
    entry,
  })

  try {
    const response = await databases.updateDocument(
      AW_DATABASE_ID!,
      AW_COLLECTION_ENTRIES_ID!,
      id,
      entry,
    )
    return response
  } catch (error) {
    console.error('Error updating entry:', error)
    throw error
  }
}
