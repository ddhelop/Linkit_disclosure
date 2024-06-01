'use client'
import { accessTokenState } from '@/context/recoil-context'
import { useRecoilState } from 'recoil'

export default function Location() {
  // recoil에서 accessTokenState를 가져옴
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  console.log('acc', accessToken)

  return (
    <div>
      <div className="flex h-screen w-full flex-col overflow-hidden pt-[69px]">
        <div className="t-[69px] fixed h-[0.18rem] w-2/3 bg-[#2563EB]"></div>
        <div className="flex w-full flex-col items-center py-16">
          <div className="flex w-[80%] justify-between text-sm font-medium leading-9 text-grey60 sm:w-[55%]">
            <span>내 이력서 가이드</span>
          </div>
          <div className="flex w-[80%] flex-col items-start leading-9 sm:w-[55%]">
            <span className="text-2xl font-bold">활동 지역 및 위치를 알려주세요</span>
          </div>
        </div>
      </div>
    </div>
  )
}
