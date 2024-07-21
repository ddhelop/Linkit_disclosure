import Image from 'next/image'

export default function Landing6() {
  return (
    <div
      style={{ backgroundImage: 'url("/assets/onBoarding/1.0/Landing4_bg.png")' }}
      className="relative flex h-screen min-h-screen w-full snap-mandatory snap-start snap-always flex-col items-center justify-center overflow-hidden overflow-x-auto bg-[#F0F2F6] bg-opacity-50 bg-cover bg-no-repeat pt-20"
    >
      <div className="flex w-full flex-col items-center">
        <p className="text-2xl font-bold">체계적인 매칭 시스템</p>
        <h1 className="text-black text-center text-[2.625rem] font-bold">
          함께 팀을 이루고싶은 사람에게 <br />
          매칭 요청을 보내요
        </h1>
        <p className=" pt-4 text-lg text-grey60">매칭 요청을 보낼 시 본인을 어필하는 메시지를 함께 전달할 수 있어요</p>
      </div>

      <div>
        <Image
          src={'/assets/onBoarding/1.0/Landing6_img.png'}
          width={950}
          height={461}
          alt="landing4"
          className="mt-[1.5rem]"
        />
      </div>
    </div>
  )
}
