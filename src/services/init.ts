import { Client, Databases } from 'node-appwrite'
const client = new Client()

const { AW_ENDPOINT, AW_PROJECT_ID, AW_SECRET_KEY } = process.env

client
  .setEndpoint(AW_ENDPOINT!)
  .setProject(AW_PROJECT_ID!)
  .setKey(AW_SECRET_KEY!)

export const databases = new Databases(client)
