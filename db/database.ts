import { MongoClient } from 'mongodb'
const url = process.env.NEXT_DATABASE_URL
const options: any = { useNewUrlParser: true }
let connectDB: Promise<MongoClient>

connectDB = new MongoClient(url as string, options).connect()

export { connectDB }
