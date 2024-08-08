'use client'
import { IFormData, PrivateIFormData } from '@/lib/types'
import './OnBoarding.css'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { accessTokenState, emailState } from '@/context/recoil-context'
import OnBoardingSelect from './OnBoardingSelect'
import { OnBoardingPrivateData } from '@/lib/action'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function OnBoardingPrivateInfo() {
  const router = useRouter()
  const email = useRecoilValue(emailState)
  const token = useRecoilValue(accessTokenState) || ''

  const { register, handleSubmit, watch, setValue } = useForm<PrivateIFormData>({
    mode: 'onChange',
  })

  const [showAgreement, setShowAgreement] = useState(false)
  const watchedFields = watch(['memberName', 'contact']) as [string, string]
  const isButtonEnabled = watchedFields[0] && watchedFields[1] && email

  const watchedAllAgree = watch('allAgree') as boolean
  const watchedServiceAgreement = watch('serviceAgreement') as boolean
  const watchedPrivacyAgreement = watch('privacyAgreement') as boolean
  const watchedAgeAgreement = watch('ageAgreement') as boolean
  const watchedMarketingAgreement = watch('marketingAgreement') as boolean

  const isCompleteButtonEnabled = watchedServiceAgreement && watchedPrivacyAgreement && watchedAgeAgreement

  useEffect(() => {
    if (watchedAllAgree) {
      setValue('serviceAgreement', true)
      setValue('privacyAgreement', true)
      setValue('ageAgreement', true)
      setValue('marketingAgreement', true)
    } else {
      setValue('serviceAgreement', false)
      setValue('privacyAgreement', false)
      setValue('ageAgreement', false)
      setValue('marketingAgreement', false)
    }
  }, [watchedAllAgree, setValue])

  const onClickSubmit = async (data: PrivateIFormData): Promise<void> => {
    if (!showAgreement) {
      setShowAgreement(true)
    } else {
      const requestData = {
        memberName: data.memberName,
        contact: data.contact,
        marketingAgree: data.marketingAgreement,
      }

      try {
        const response = await OnBoardingPrivateData(requestData, token)
        if (response.status === 200 || response.status === 201 || response.status === 409) {
          router.push('/onBoarding/select')
        }
      } catch (error) {
        console.error('Error caught:', error)
      }
    }
  }

  const handleBack = () => {
    setShowAgreement(false)
  }

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-0 flex">
        <OnBoardingSelect />
      </div>

      <div className="relative z-20 flex h-full w-full flex-col bg-[#000] bg-opacity-40">
        <div className="flex h-full w-full items-center justify-center  px-4">
          <div className=" w-full rounded-md bg-[#fff] p-7 sm:w-[24rem] sm:shadow-boarding-shadow">
            <form onSubmit={handleSubmit(onClickSubmit)} className="items-left flex flex-col">
              {!showAgreement ? (
                <>
                  <div className="w-[100%]">
                    <h2 className=" font-semibol pb-4">기본 정보를 입력해주세요.</h2>
                    <h2 className="pb-1 text-sm font-semibold">성함</h2>
                    <input
                      placeholder="Name"
                      className="h-[2.75rem] w-full rounded-md border border-grey30 p-4 text-sm text-grey90 outline-none focus:border-2 focus:border-grey90"
                      {...register('memberName', { required: true })}
                    />
                  </div>

                  <div className="w-[100%] pt-[1.1rem]">
                    <h2 className="pb-1 text-sm font-semibold">연락처</h2>
                    <input
                      {...register('contact', { required: true })}
                      placeholder="01012345678"
                      className="h-[2.75rem] w-full rounded-md border border-grey30 p-4 text-sm text-grey90 outline-none focus:border-2 focus:border-grey90"
                    />
                  </div>

                  <div className="w-[100%] pt-[1.1rem]">
                    <h2 className="pb-1 text-sm font-semibold">이메일</h2>
                    <div className="alw-full flex h-[2.75rem] items-center rounded-md border border-grey30 p-4 text-sm text-grey90 outline-none focus:border-2 focus:border-grey90">
                      <span className="text-grey50">{email}</span>
                    </div>
                  </div>
                  <div className="pl-1 pt-1 text-xs text-main">
                    *매칭 성사 시 해당 이메일 주소가 상대방에게 공유됩니다.
                  </div>

                  <div className="flex w-full justify-end ">
                    <button
                      type="submit"
                      className={`mt-7 h-9 w-36 rounded text-xs text-[#fff] ${
                        isButtonEnabled ? 'bg-[#2563EB]' : 'bg-[#7EA5F8]'
                      }`}
                      disabled={!isButtonEnabled}
                    >
                      다음
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="pb-4 font-semibold">서비스 이용을 위해 약관에 동의해주세요</h2>
                  <label className="mt-6 flex items-center">
                    <input type="checkbox" {...register('allAgree')} />
                    <span className="pl-2 text-sm">전체 동의</span>
                  </label>
                  <hr className="my-6" />
                  <div className="flex flex-col gap-4 text-grey80">
                    <label className="flex items-center">
                      <input type="checkbox" {...register('serviceAgreement', { required: true })} />
                      <span className="flex pl-2 text-sm">
                        (필수)
                        <Link
                          href="https://amusing-hygienic-ec8.notion.site/503c5d589f0942068517f84febb99f3c?pvs=4"
                          target="_blank"
                          className="px-1 underline"
                        >
                          서비스 이용약관{' '}
                        </Link>{' '}
                        동의
                      </span>
                    </label>
                    <label className="flex items-center pt-2">
                      <input type="checkbox" {...register('privacyAgreement', { required: true })} />
                      <span className="pl-2 text-sm">
                        (필수)
                        <Link
                          target="_blank"
                          href="https://amusing-hygienic-ec8.notion.site/f93f401d27ee4ab2add3be89f44e6448?"
                          className="px-1 underline"
                        >
                          개인정보 수집 및 이용 동의
                        </Link>
                      </span>
                    </label>
                    <label className="flex items-center pt-2">
                      <input type="checkbox" {...register('ageAgreement', { required: true })} />
                      <span className="pl-2 text-sm">(필수) 만 14세 이상입니다</span>
                    </label>
                    <label className="flex items-center pt-2">
                      <input type="checkbox" {...register('marketingAgreement')} />
                      <span className="pl-2 text-sm">(선택) 광고성 정보 수신 동의</span>
                    </label>
                  </div>
                  <div className="mt-7 flex w-full justify-between gap-2">
                    <button type="button" className="h-9 w-40 rounded bg-grey20 text-xs " onClick={handleBack}>
                      이전
                    </button>
                    <button
                      type="submit"
                      className={`h-9 w-40 rounded text-xs text-[#fff] ${
                        isCompleteButtonEnabled ? 'bg-[#2563EB]' : 'bg-[#7EA5F8]'
                      }`}
                      disabled={!isCompleteButtonEnabled}
                    >
                      완료
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
