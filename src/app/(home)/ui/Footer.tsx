import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-[10rem] flex w-full justify-center bg-grey10 py-[2.62rem] text-xs">
      <div className="flex w-[93%] flex-col xl:w-[65%]">
        {/* 첫 줄 */}
        <div className="flex justify-between">
          <div className="flex items-center text-grey80">
            <Image src={'/common/logo_with_text.svg'} alt="링킷 로고" width={110} height={21} />

            <Link
              href={'https://1xdvp.channel.io/home'}
              className="ml-[2.13rem] cursor-pointer hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              문의하기
            </Link>
            <Link
              href={'https://blog.naver.com/linkit_official'}
              target="_blank"
              className="ml-[1.5rem] cursor-pointer hover:underline"
              rel="noopener noreferrer"
            >
              블로그
            </Link>
          </div>
          {/* 아이콘 라우팅 */}
          <nav aria-label="소셜 미디어 링크">
            <ul className="flex gap-3">
              <li>
                <Link
                  href={'https://blog.naver.com/linkit_official'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="네이버 블로그"
                >
                  <Image
                    src={'/common/icons/naver_blog_black.svg'}
                    alt=""
                    width={20}
                    height={20}
                    className="cursor-pointer transition-all duration-300"
                    aria-hidden="true"
                  />
                </Link>
              </li>
              <li>
                <Link
                  href={'https://open.kakao.com/o/gee0u5kg'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="카카오톡 오픈채팅"
                >
                  <Image
                    src={'/common/icons/kakaotalk_black.svg'}
                    alt=""
                    width={20}
                    height={20}
                    className="cursor-pointer transition-all duration-300"
                    aria-hidden="true"
                  />
                </Link>
              </li>
              <li>
                <Link
                  href={'https://www.instagram.com/linkit_official'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="인스타그램"
                >
                  <Image
                    src={'/common/icons/insta_black.svg'}
                    alt=""
                    width={20}
                    height={20}
                    className="cursor-pointer transition-all duration-300"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* 회사정보 */}
        <address className="mt-[1.63rem] flex flex-col gap-1 not-italic text-grey50">
          <span>
            <b>주소</b> 서울특별시 종로구 127
          </span>
          <span>
            <b>대표자</b> 주서영
          </span>
          <span>
            <b>개인정보관리책임자</b> 권동민
          </span>
        </address>

        {/* 개인정보처리 방침, 이용약관 */}
        <nav className="mt-8 flex gap-4 text-grey80" aria-label="법적 정보">
          <Link
            href={'https://paint-crowley-ff2.notion.site/187c158365ac81f98d69fd8fac385be7?pvs=4'}
            className="cursor-pointer hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            개인정보처리 방침
          </Link>
          <span className="text-grey40" aria-hidden="true">
            |
          </span>
          <Link
            href={'https://paint-crowley-ff2.notion.site/187c158365ac814da94cd29aa5864088?pvs=4'}
            className="cursor-pointer hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            이용약관
          </Link>
        </nav>

        {/* 구분선 */}
        <hr className="my-8 h-[1px] w-full bg-grey40" />

        {/* copyright */}
        <div className="text-grey50">
          <small>© 2025. liaison. All rights reserved.</small>
        </div>
      </div>
    </footer>
  )
}
