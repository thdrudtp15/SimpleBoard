import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const url = request.nextUrl.pathname

  if (url === '/writing') {
    const session = await getToken({ req: request })
    if (session === null) {
      return NextResponse.redirect(new URL('/api/auth/signin', request.url))
    }
  }
}

//   console.log(request.nextUrl)  //유저가 요청중인 URL 출력해줌
//   console.log(request.cookies)  //유저가 보낸 쿠키 출력해줌
//   console.log(request.headers)  //유저의 headers 정보 출력해줌
//   NextResponse.next()  //통과
//   NextResponse.redirect()  //다른페이지 이동
//   NextResponse.rewrite()  //다른페이지 이동
