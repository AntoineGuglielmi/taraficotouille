import { ID } from 'node-appwrite'
import { storage } from './init'
import { TypeEntryRefined } from '@/types/TypeEntryRefined'

const { AW_VOICE_ENTRY_BUCKET_ID } = process.env

export const createAudio = async ({
  audioFile,
}: {
  audioFile: File
}): Promise<string> => {
  const response = await storage.createFile(
    AW_VOICE_ENTRY_BUCKET_ID!,
    ID.unique(),
    audioFile,
  )
  return response.$id
}

export const getAudiosBatch = async ({
  audiosId,
}: {
  audiosId: TypeEntryRefined['audiosId']
}) => {
  const audios = []
  for (const audioId of audiosId) {
    const audio = await storage.getFileView(AW_VOICE_ENTRY_BUCKET_ID!, audioId)
    audios.push({
      audio,
      audioId,
    })
  }
  return audios
}

export const removeAudio = async ({ audioId }: { audioId: string }) => {
  const response = await storage.deleteFile(AW_VOICE_ENTRY_BUCKET_ID!, audioId)
  return response
}
