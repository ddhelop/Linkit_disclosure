import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-screen w-full flex-col items-center justify-center bg-white">
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <Image src="/assets/images/404_image.svg" alt="404" width={330} height={212} />
        <div className="pt-[0.61rem] text-center text-main">
          원하시는 결과를 찾을 수 없습니다.
          <br />
          올바른 URL이 입력되었는지 확인해주세요
        </div>
        <Link href="/">
          <button className="mt-[1.19rem] rounded-lg border border-main px-[1.44rem] py-3 text-main">
            링킷 사이트 바로가기
          </button>
        </Link>
      </div>
    </div>
  )
}
