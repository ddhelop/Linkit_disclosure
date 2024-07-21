import Image from 'next/image'

export default function Landing1() {
  return (
    <div
      // style={{ backgroundImage: 'url("/assets/intro/section3bg.png")' }}
      className="relative flex h-screen min-h-screen w-full snap-mandatory snap-start snap-always flex-col items-center justify-center overflow-hidden overflow-x-auto bg-[#F0F2F6] bg-opacity-50 bg-cover bg-no-repeat"
    >
      <div className="pt-[6.56rem]">
        <h1 className="text-main text-center text-[3.375rem] font-bold">
          성공적인 팀을 이루는
          <br /> 가장 쉬운 방법,
        </h1>
        <p className="pt-4 text-[1.1875rem] text-grey70">
          링킷에서 나의 비전과 가치관을 공유할 수 있는 사람을 만나보세요
        </p>
      </div>

      <div className="mt-[5.13rem] flex w-full justify-center">
        <button className="bg-main text-white rounded-lg px-[1.88rem] py-[1.18rem] text-lg font-semibold">
          1분만에 프로필 만들기
        </button>
      </div>

      <div className="relative flex w-full items-end justify-center">
        <Image
          src="/assets/onBoarding/1.0/Landing1_profile1_left.png"
          className="max-h-[181px]"
          width={320}
          height={141}
          alt="profile1"
        />
        <Image
          src="/assets/onBoarding/1.0/Landing1_profile1_center.png"
          width={526}
          height={298}
          alt="profile2"
          className="z-10"
        />
        <Image
          src="/assets/onBoarding/1.0/Landing1_profile1_right.png"
          width={320}
          height={141}
          alt="profile3"
          className="max-h-[181px]"
        />
        <Image
          src="/assets/onBoarding/1.0/Landing1_pointer.svg"
          width={8}
          height={87}
          alt="profile4"
          className="absolute top-4 z-0"
        />
      </div>
    </div>
  )
}
