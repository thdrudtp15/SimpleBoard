import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { connectDB } from '@/db/database'
import { MongoClient } from 'mongodb'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const body = await req.json()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  body.activate = true
  body.date = new Date()
  body.images = []
  body.public = body.publicOption
  body.author = session?.user?.name

  try {
    const client: MongoClient = await connectDB
    const db = client.db('simple_board')
    const result: unknown = await db.collection('post').insertOne(body)
  } catch (e) {
    console.log('서버에러')
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }

  return NextResponse.json({ status: 200 })
}
