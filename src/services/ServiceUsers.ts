import { Query } from 'node-appwrite'
import { databases } from './init'

const { AW_DATABASE_ID, AW_USERS_COLLECTION_ID } = process.env

export const userAvailable = async ({
  id,
}: {
  id: string
}): Promise<string | false> => {
  try {
    const response = await databases.listDocuments(
      AW_DATABASE_ID!,
      AW_USERS_COLLECTION_ID!,
      [Query.and([Query.equal('$id', id), Query.equal('activated', false)])],
    )

    const canCreateUser = response.total > 0

    if (canCreateUser) {
      const userType: string = response.documents[0].type

      await databases.updateDocument(
        AW_DATABASE_ID!,
        AW_USERS_COLLECTION_ID!,
        id,
        {
          activated: true,
        },
      )

      return userType
    }

    return false
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const getAvailableUsers = async () => {
  try {
    const response = await databases.listDocuments(
      AW_DATABASE_ID!,
      AW_USERS_COLLECTION_ID!,
      [Query.equal('activated', false)],
    )
    const availableUsers = response.documents
    return availableUsers
  } catch {}
}

export const getUserById = async ({ id }: { id: string }) => {
  try {
    const response = await databases.listDocuments(
      AW_DATABASE_ID!,
      AW_USERS_COLLECTION_ID!,
      [Query.equal('$id', id)],
    )
    const user = response.documents[0]
    return user
  } catch {}
}
