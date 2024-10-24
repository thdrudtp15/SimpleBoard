import { NextRequest, NextResponse } from 'next/server'
import aws from 'aws-sdk'

export async function GET(req: NextRequest) {
  aws.config.update({
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_AWS_SECRET_KEY,
    region: 'ap-northeast-2',
    signatureVersion: 'v4',
  })

  const s3 = new aws.S3()
  const fileKey = req.nextUrl.searchParams.get('file')

  const url = await s3.createPresignedPost({
    Bucket: process.env.NEXT_AWS_BUCKET_NAME,
    Fields: { key: fileKey },
    Expires: 60,
    Conditions: [['content-length-range', 0, 1048576]],
  })

  console.log(fileKey, url, '서버 일해요')
  return NextResponse.json({ data: url, status: 200 })
}
