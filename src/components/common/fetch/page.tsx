import Image from 'next/image'

export default function FetchSetting({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="hidden flex-col md:flex">{children}</div>
      <div className="flex h-screen flex-col items-center justify-center md:hidden">
        <h1 className="text-3xl font-bold">Coming soon</h1>
        <Image src="/assets/images/ComingSoon.png" width={112} height={148} alt="coming" className="mt-[2.81rem]" />
        <p className="mt-[2.39rem] text-center">
          모바일 버전은 오픈 예정입니다🥲
          <br /> PC로 접속해서 서비스를 이용해보세요!
        </p>
      </div>
    </>
  )
}
