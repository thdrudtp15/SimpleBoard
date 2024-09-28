import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/db/database'
import { MongoClient } from 'mongodb'

export async function POST(req: NextRequest) {
  return NextResponse.json({ status: 200 })
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  // 아이디 가져오기

  const client: MongoClient = await connectDB
  const db = client.db('simple_board')
  const result = await db.collection('comment').find().toArray()

  return NextResponse.json({ status: 200 })
}
