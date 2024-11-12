import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { MongoClient, ObjectId } from 'mongodb'

import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { connectDB } from '@/db/database'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: '로그인 해주세요' }, { status: 401 })
  }
  const body = await req.json()
  body.activate = true
  body.date = new Date()

  try {
    const client: MongoClient = await connectDB
    const db = client.db('simple_board')
    const result: unknown = await db.collection('post').insertOne(body)
  } catch (e) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }

  return NextResponse.json({ status: 200 })
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const id = req.nextUrl.searchParams.get('id')
  try {
    const client: MongoClient = await connectDB
    const db = client.db('simple_board')
    const result: { acknowledged: boolean } = await db
      .collection('post')
      .updateOne(
        { _id: new ObjectId(id?.toString()) },
        { $set: { activate: false } },
      )
    if (!result.acknowledged) {
      throw new Error()
    } else {
      return NextResponse.redirect(new URL('/', 'http://localhost:3000'))
    }
  } catch (e) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}
