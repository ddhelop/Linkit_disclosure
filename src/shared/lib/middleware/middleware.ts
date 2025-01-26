import { NextResponse, type NextRequest } from 'next/server'

const AUTH_PAGES = ['/', '/login']

export default function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request
  const { origin, pathname } = nextUrl
  const accessToken = cookies.get('accessToken')

  // 로그인이 필요 없는 페이지
  if (AUTH_PAGES.some((page) => pathname.startsWith(page))) {
    // 로그인 되어 있는 경우 메인 페이지로 리다이렉트
    if (accessToken) {
      return NextResponse.redirect('/')
    } else {
      // 로그인이 필요 없는 페이지는 그냥 다음 요청으로 진행
      return NextResponse.next()
    }
  }

  // 로그인이 필요한 페이지
  if (!accessToken) {
    // 로그인 페이지로 리다이렉트
    return NextResponse.redirect('/login')
  }

  // 로그인 되어 있는 경우 요청 페이지로 진행
  return NextResponse.next()
}
