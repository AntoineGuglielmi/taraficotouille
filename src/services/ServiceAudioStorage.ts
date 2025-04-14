import { ID } from 'node-appwrite'
import { storage } from './init'

const { AW_VOICE_ENTRY_BUCKET_ID } = process.env

export const createAudio = async ({
  audioFile,
}: {
  audioFile: File
}): Promise<void> => {
  await storage.createFile(AW_VOICE_ENTRY_BUCKET_ID!, ID.unique(), audioFile)
}
