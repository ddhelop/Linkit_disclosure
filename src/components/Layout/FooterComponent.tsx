import Image from 'next/image'

export default function FooterComponent() {
  return (
    <footer className="w-full py-20 px-44">
      <Image src={'/assets/intro/footerLogo.svg'} width={169} height={31} alt="logo" />

      <div className="flex flex-col gap-2 pt-20">
        <span className="text-xl font-medium text-grey100">리에종 ㅣ 서울특별시 종로구 동숭길 127 4층</span>
        <span className="text-xl font-medium text-grey100">대표 : 주서영</span>
        <span className="text-xl font-medium text-grey100">
          문의 : linkit_official@naver.com l 010-4641-5411 (오전 9시 ~ 오후 6시)
        </span>
      </div>
    </footer>
  )
}
