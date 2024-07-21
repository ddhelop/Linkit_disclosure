import Image from 'next/image'

export default function Landing3() {
  return (
    <div className="relative flex h-screen min-h-screen w-full snap-mandatory snap-start snap-always flex-col items-center justify-center overflow-hidden overflow-x-auto bg-[#F0F2F6] bg-opacity-50 bg-cover bg-no-repeat pt-20">
      <div className="flex w-full flex-col items-center">
        <p className="text-2xl font-bold">목표는 있지만 매번 팀원 구하다가 흐지부지..</p>
        <h1 className="text-black text-center text-[2.625rem] font-bold">
          링킷으로 나를 홍보하고
          <br />
          빠르게 팀을 이루세요
        </h1>
        <p className=" pt-4 text-lg text-grey60">
          목표가 통하는 사람들과 자유롭게 소통하면서 성공적인 팀빌딩으로 이어질 수 있습니다.
        </p>
      </div>

      <Image
        src={'/assets/onBoarding/1.0/Landing3_notebook.png'}
        width={600}
        height={352}
        alt="landing3"
        className="mt-[4.5rem]"
      />
    </div>
  )
}
