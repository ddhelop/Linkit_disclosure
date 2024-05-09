import Image from 'next/image'

export default function FooterComponent() {
  return (
    <footer className="w-full pt-20 pb-8 px-44 text-xl font-medium text-grey100">
      <Image src={'/assets/intro/footerLogo.svg'} width={169} height={31} alt="logo" />

      <div className="flex flex-col gap-[0.59rem] pt-5">
        <span className="">liaison ㅣ 서울특별시 종로구 동숭길 127</span>
        <span className="text-grey100">대표 : 주서영 ㅣ 개인정보관리책임자 : 권동민</span>
        <div className="flex gap-x-6">
          <span>문의하기 (오전 9시 ~ 오후 6시)</span>
          <span>커뮤니티</span>
          <span>FAQ</span>
        </div>
        <span className="">ⓒ 2024. liaison All rights reserved.</span>
        <div className="flex gap-x-7 pt-2">
          <Image
            src={'/assets/icons/instagram_dark.svg'}
            width={37}
            height={37}
            alt="instagram"
            className="cursor-pointer"
          />
          <Image
            src={'/assets/icons/kakao_dark.svg'}
            width={37}
            height={37}
            alt="kakaoTalk"
            className="cursor-pointer"
          />
        </div>
      </div>
    </footer>
  )
}
