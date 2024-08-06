import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function FooterComponent() {
  const router = useRouter()

  return (
    <footer className="w-full py-20 text-xs font-medium text-grey100 sm:text-base">
      <div className="flex w-full gap-[1.88rem] px-[8.88rem]">
        <Link href={'https://bit.ly/4biOQ1Z'} target="_blank">
          <span className="">커뮤니티</span>
        </Link>
        <Link href={'https://1xdvp.channel.io/home'} target="_blank">
          <span className="cursor-pointer">문의하기</span>
        </Link>
        <Link href={'https://amusing-hygienic-ec8.notion.site/503c5d589f0942068517f84febb99f3c?pvs=4'} target="_blank">
          <span className="">이용약관</span>
        </Link>
        <Link href={'https://amusing-hygienic-ec8.notion.site/c11cc9b3354b4c55946679d00a4a5168?pvs=4'} target="_blank">
          <span className="">개인정보처리방침</span>
        </Link>
      </div>
      <hr className="my-[1.2rem]" />

      <div className=" px-[8.88rem]">
        <Link href={'/'}>
          <Image src={'/assets/intro/footerLogo.svg'} width={109} height={20} alt="logo" className="" />
        </Link>
        <div className="flex flex-col pt-[0.9rem]">
          <div className="flex gap-4">
            <span className="text-grey100">
              리에종 ㅣ 대표 : 주서영 ㅣ 개인정보관리책임자 : 권동민 ㅣ 주소 : 서울특별시 종로구 127 ㅣ메일 :
              linkit@linkit.im
            </span>
          </div>
          <div className="flex gap-x-6 pt-[0.44rem]">
            <span className="">ⓒ 2024. liaison All rights reserved.</span>
          </div>
          <div className="flex gap-x-4 pt-[0.94rem]">
            <Image
              onClick={() => {
                router.push('https://bit.ly/4bspBdG')
              }}
              src={'/assets/icons/instagram_dark.svg'}
              width={30}
              height={30}
              alt="instagram"
              className="cursor-pointer"
            />
            <Image
              onClick={() => {
                router.push('https://bit.ly/4biOQ1Z')
              }}
              src={'/assets/icons/kakao_dark.svg'}
              width={30}
              height={30}
              alt="kakaoTalk"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
