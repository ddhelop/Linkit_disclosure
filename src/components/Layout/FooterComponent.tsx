import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function FooterComponent() {
  const router = useRouter()

  return (
    <footer className="w-full py-20 font-medium text-grey100 ">
      <div className="flex w-full gap-[1.88rem] px-[6.88rem]">
        <Link href={'https://bit.ly/4biOQ1Z'} target="_blank">
          <span className="">커뮤니티</span>
        </Link>
        <Link href={'https://nn4e1.channel.io/home'} target="_blank">
          <span className="cursor-pointer">문의하기</span>
        </Link>
        <Link href={'https://amusing-hygienic-ec8.notion.site/503c5d589f0942068517f84febb99f3c?pvs=4'} target="_blank">
          <span className="">이용약관</span>
        </Link>
        <Link href={'https://amusing-hygienic-ec8.notion.site/c11cc9b3354b4c55946679d00a4a5168?pvs=4'} target="_blank">
          <span className="">개인정보처리방침</span>
        </Link>
      </div>
      <hr className="my-[1.12rem]" />

      <div className=" px-[6.88rem]">
        <Link href={'/'}>
          <Image src={'/assets/intro/footerLogo.svg'} width={129} height={23} alt="logo" className="w-24 lg:w-auto" />
        </Link>
        <div className="flex flex-col pt-6">
          <div className="flex gap-4">
            <span className="text-grey100">
              리에종 ㅣ 대표 : 주서영 ㅣ 개인정보관리책임자 : 권동민 ㅣ 주소 : 서울특별시 종로구 127 ㅣ메일 :
              linkit@linkit.im
            </span>
          </div>
          <div className="flex gap-x-6 pt-4">
            <span className="">ⓒ 2024. liaison All rights reserved.</span>
          </div>
          <div className="flex gap-x-4 pt-4">
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
