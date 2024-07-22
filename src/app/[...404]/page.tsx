import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-screen w-full flex-col items-center justify-center bg-white">
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <Image src="/assets/images/404_image.svg" alt="404" width={455} height={232} />
        <Link href="/">
          <button className="mt-[2.3rem] rounded-lg border border-main px-[1.44rem] py-3 text-main">
            링킷 사이트 바로가기
          </button>
        </Link>
      </div>
    </div>
  )
}
