import { Query } from 'node-appwrite'
import { databases } from './init'

const { AW_DATABASE_ID, AW_USERS_COLLECTION_ID } = process.env

export const userAvailable = async ({
  type = 'admin',
  id,
}: {
  type?: string
  id: string
}) => {
  try {
    const response = await databases.listDocuments(
      AW_DATABASE_ID!,
      AW_USERS_COLLECTION_ID!,
      [
        Query.and([
          Query.equal('type', type),
          Query.equal('$id', id),
          Query.equal('activated', false),
        ]),
      ],
    )
    const userCanBeCreated = response.total > 0
    if (userCanBeCreated) {
      await databases.updateDocument(
        AW_DATABASE_ID!,
        AW_USERS_COLLECTION_ID!,
        id,
        {
          activated: true,
        },
      )
    }
    return userCanBeCreated
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}
