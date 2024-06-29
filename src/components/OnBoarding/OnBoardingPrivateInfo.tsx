'use client'
import { IFormData } from '@/lib/types'
import './OnBoarding.css'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { emailState } from '@/context/recoil-context'
import OnBoardingSelect from './OnBoardingSelect'

export default function OnBoardingPrivateInfo() {
  const router = useRouter()
  const email = useRecoilValue(emailState)

  const { register, handleSubmit, watch } = useForm<IFormData>({
    mode: 'onChange',
  })

  const watchedFields = watch(['memberName', 'contact'])
  const isButtonEnabled = watchedFields[0] && watchedFields[1] && email

  const onClickSubmit = async (data: IFormData): Promise<void> => {
    console.log(data)
    try {
      const accessToken = window.localStorage.getItem('accessToken')
      const response = await fetch(`${process.env.LINKIT_SERVER_URL}/members/basic-inform`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
        body: JSON.stringify({
          memberName: data.memberName,
          contact: data.contact,
          marketingAgree: data.marketingAgree,
        }),
        credentials: 'include', // 쿠키를 포함시키기 위해 필요
      })
      if (response.status === 200 || response.status === 201 || response.status === 409) {
        router.push('/onBoarding/select')
      }
    } catch (error) {
      console.error('Error caught:', error)
      // handle error
    }
  }

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-0 flex">
        <OnBoardingSelect />
      </div>

      <div className="relative z-20 flex h-full w-full flex-col bg-[#000] bg-opacity-40">
        <div className="flex h-full w-full items-center justify-center">
          <div className=" w-full bg-[#fff] p-7 sm:w-[24rem] sm:rounded-md sm:shadow-boarding-shadow">
            <h2 className=" font-semibold">기본 정보를 입력해주세요.</h2>

            <form onSubmit={handleSubmit(onClickSubmit)} className="items-left flex flex-col">
              <div className="w-[100%] pt-[1.31rem]">
                <h2 className="pb-1 text-sm font-semibold">성함</h2>
                <input
                  placeholder="name"
                  className="h-[2.75rem] w-full rounded-md border border-grey30 p-4 text-sm text-grey90 outline-none focus:border-2 focus:border-grey90"
                  {...register('memberName', { required: true })}
                />
              </div>

              <div className="w-[100%] pt-[1.1rem]">
                <h2 className="pb-1 text-sm font-semibold">연락처</h2>
                <input
                  {...register('contact', { required: true })}
                  placeholder="phoneNumber"
                  className="h-[2.75rem] w-full rounded-md border border-grey30 p-4 text-sm text-grey90 outline-none focus:border-2 focus:border-grey90"
                />
              </div>

              <div className="w-[100%] pt-[1.1rem]">
                <h2 className="pb-1 text-sm font-semibold">이메일</h2>
                <div className="alw-full flex h-[2.75rem] items-center rounded-md border border-grey30 p-4 text-sm text-grey90 outline-none focus:border-2 focus:border-grey90">
                  <span className="text-grey50">{email}</span>
                </div>
              </div>

              <div className="w-[100%] pt-[1.1rem]">
                <h2 className="pb-1 text-sm font-semibold">팀원에게서 받은 초대초대가 있나요?</h2>
                <input
                  placeholder="code"
                  className="h-[2.75rem] w-full rounded-md border border-grey30 p-4 text-sm text-grey90 outline-none focus:border-2 focus:border-grey90"
                />
              </div>

              {/* 체크 */}
              <label className="flex items-center pt-[1.1rem]">
                <input {...register('marketingAgree')} type="checkbox" />
                <span className="pl-2 text-xs text-grey60">뉴스레터 및 마케팅 정보 수신 동의</span>
              </label>

              <div className="flex w-full justify-end ">
                <button
                  type="submit"
                  className={`mt-7 h-9 w-36 rounded text-xs text-[#fff] ${
                    isButtonEnabled ? 'bg-[#2563EB]' : 'bg-[#7EA5F8]'
                  }`}
                  disabled={!isButtonEnabled}
                >
                  완료
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
