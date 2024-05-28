'use client'
import { IFormData } from '@/lib/types'
import './OnBoarding.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { emailState } from '@/context/recoil-context'

export default function OnBoardingPrivateInfo() {
  const router = useRouter()
  const email = useRecoilValue(emailState)

  const { register, handleSubmit } = useForm<IFormData>({
    mode: 'onChange',
  })

  const onClickSubmit = async (data: IFormData): Promise<void> => {
    console.log(data)
    try {
      const accessToken = window.localStorage.getItem('accessToken')
      const response = await fetch(`https://dev.linkit.im/members/basic-inform`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
        body: JSON.stringify({
          memberName: data.memberName,
          contact: data.contact,
          roleName: data.roleName,
          marketingAgree: data.marketingAgree,
        }),
        credentials: 'include', // 쿠키를 포함시키기 위해 필요
      })
      console.log('response', response)
    } catch (error) {
      console.error('Error caught:', error)
      // handle error
    }
  }

  return (
    <>
      <div className="flex h-full w-full flex-col bg-[#9A9A9A]">
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-full w-full bg-[#fff] p-7 sm:h-[37.5rem] sm:w-[24rem] sm:rounded-md sm:shadow-boarding-shadow">
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
                <h2 className="pb-1 text-sm font-semibold">전화번호</h2>
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
                <h2 className="pb-1 text-sm font-semibold">직무/역할</h2>
                <select
                  {...register('roleName', { required: true })}
                  className="custom-select h-[2.75rem] w-full appearance-none rounded-md border border-grey30 bg-right bg-no-repeat px-3 text-sm text-grey50 outline-none focus:border-2 focus:border-grey90"
                >
                  <option value="" className="h-full">
                    나의 직무를 선택해주세요.
                  </option>
                  <option value="기획">기획</option>
                  <option value="마케팅">마케팅</option>
                  <option value="디자인">디자인</option>
                  <option value="개발">개발</option>
                  <option value="비즈니스">비즈니스</option>
                </select>
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
                <button type="submit" className={`mt-7 h-9 w-36 rounded bg-[#7EA5F8] text-xs text-[#fff]`}>
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
