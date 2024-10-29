import { MongoClient, ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { connectDB } from '@/db/database'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized', status: 401 })
  }
  const body = await req.json()
  if (session.user) {
    body.author = session.user.name
    body.date = new Date()
    body.parent_id = new ObjectId(body.parent_id)
    body.author_image = ''
    body.ref = 1
  }

  const client: MongoClient = await connectDB
  const db = client.db('simple_board')
  const result = await db.collection('comment').insertOne(body)

  if (!result) {
    return NextResponse.json({ error: 'Error', status: 500 })
  }
  return NextResponse.json({ data: '성공', status: 200 })
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  // 아이디 가져오기

  const client: MongoClient = await connectDB
  const db = client.db('simple_board')
  const result = await db
    .collection('comment')
    .find({ parent_id: new ObjectId(id as string) })
    .toArray()

  return NextResponse.json({ data: result, status: 200 })
}
