import { MongoClient } from 'mongodb'

const url = process.env.NEXT_DATABASE_URL
const connectDB: Promise<MongoClient> = new MongoClient(url as string).connect()

export { connectDB }
