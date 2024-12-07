import Image from 'next/image'

export default function TeamEditProfileCard() {
  return (
    <div className="flex gap-4 rounded-xl border border-grey40 bg-white p-4">
      <Image src="/common/default_profile.svg" width={80} height={80} alt="team-default-logo" />

      <div className="flex flex-col justify-center">
        <span className="text-lg font-semibold text-grey90">팀 이름</span>

        <div className="mt-2 flex flex-col gap-1">
          <span className="flex gap-2 text-xs text-grey60">
            팀원 | <span className="text-grey70">5인</span>
          </span>

          <span className="flex gap-2 text-xs text-grey60">
            지역 | <span className="text-grey70">서울시 마포구</span>
          </span>
        </div>
      </div>
    </div>
  )
}
