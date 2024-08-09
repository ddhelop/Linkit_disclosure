'use client'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { TeamOnBoardingData, TeamOnBoardingField } from '@/lib/action'
import { useRouter } from 'next/navigation'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState, authState } from '@/context/recoil-context'
import OnBoardingHeader from '../OnBoardingHeader'
import { pushNotification } from '@/components/common/component/ToastPopUp/ToastPopup'
import Input from '@/components/common/component/Basic/Input'
import Select from '@/components/common/component/Basic/Select'

const ShortTerm = ['창업', '공모전', '대회', '사이드 프로젝트', '포트폴리오']

interface FormInputs {
  teamName: string
  teamSize: string
  teamField: string
  teamBuildingFieldNames: string[]
}

export default function TeamCategory() {
  const [teamBuildingFieldNames, setTeamBuildingFieldNames] = useState<string[]>([])
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [isAuth, setIsAuth] = useRecoilState(authState)
  const router = useRouter()

  // useForm
  const { control, handleSubmit, watch, setValue } = useForm<FormInputs>({
    defaultValues: {
      teamName: '',
      teamSize: '',
      teamField: '',
      teamBuildingFieldNames: [],
    },
  })

  // 팀온보딩 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        try {
          const data = await TeamOnBoardingData(accessToken)

          if (data.onBoardingFieldTeamInformResponse) {
            const { teamName, sizeType, sectorName, teamBuildingFieldNames } = data.onBoardingFieldTeamInformResponse
            setValue('teamName', teamName || '')
            setValue('teamSize', sizeType || '')
            setValue('teamField', sectorName || '')
            setValue('teamBuildingFieldNames', teamBuildingFieldNames || [])
            setTeamBuildingFieldNames(teamBuildingFieldNames || [])
          }
        } catch (error) {
          console.error('Failed to fetch onboarding data', error)
        }
      }
    }
    fetchData()
  }, [setValue, accessToken])

  // 팀온보딩 데이터 저장하기
  const onSubmit = async (data: FormInputs) => {
    try {
      const response = await TeamOnBoardingField(accessToken, data)

      if (response.ok) {
        router.push('/onBoarding/team/activityWay')
      } else {
        pushNotification('팀 정보 저장에 실패했습니다.', 'error')
      }
    } catch (error) {
      console.error('Failed to submit onboarding data', error)
      pushNotification('팀 정보 저장에 실패했습니다.', 'error')
    }
  }

  const toggleShortTermField = (field: string) => {
    const newFields = teamBuildingFieldNames.includes(field)
      ? teamBuildingFieldNames.filter((v) => v !== field)
      : [...teamBuildingFieldNames, field]
    setTeamBuildingFieldNames(newFields)
    setValue('teamBuildingFieldNames', newFields)
  }

  const formValues = watch()
  const { teamName, teamSize, teamField } = formValues
  const isNextButtonEnabled = teamBuildingFieldNames.length > 0 && teamName && teamSize && teamField

  return (
    <div className="h-screen bg-[#FCFCFD]">
      <OnBoardingHeader percentage={35} />
      <div className="flex w-full flex-col px-6 pt-6 lg:py-[69px]">
        <div className="flex w-full flex-col items-center pb-24 pt-16">
          <div className="flex w-full justify-between text-sm font-medium leading-9 text-grey60 sm:w-[55%]">
            <span>팀 소개서 가이드</span>
          </div>
          <div className="flex w-full flex-col items-start leading-9 sm:w-[55%]">
            <span className="text-2xl font-bold">희망 팀빌딩 분야를 선택해 주세요</span>
            <span className="text-grey60">*중복선택 가능</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center">
            {/* 단기 */}
            <div className="flex w-full flex-col pt-8 sm:w-[55%]">
              <div className="flex flex-wrap gap-x-2 gap-y-2">
                {ShortTerm.map((el, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-auto rounded-md border px-3 py-1 ${
                      teamBuildingFieldNames.includes(el)
                        ? 'border-[#2563EB] bg-[#D3E1FE66] text-[#2563EB]'
                        : 'border-[#CBD4E1] text-[#64748B]'
                    }`}
                    onClick={() => toggleShortTermField(el)}
                  >
                    {el}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col pt-16 sm:w-[55%]">
              <span className="text-lg font-bold leading-5">
                팀명을 입력해 주세요 <span className="pl-1 text-sm font-normal text-main">*</span>
              </span>
              <Controller name="teamName" control={control} render={({ field }) => <Input type="text" {...field} />} />
            </div>

            <div className="flex w-full flex-col gap-5 pt-16 sm:w-[55%] lg:flex-row">
              <div className="flex flex-col gap-3">
                <span className="text-lg font-bold leading-5">
                  규모 <span className="pl-1 text-sm font-normal text-main">*</span>
                </span>
                <Controller
                  name="teamSize"
                  control={control}
                  render={({ field }) => (
                    <Select
                      name="teamSize"
                      options={[
                        { value: '', label: '선택' },
                        { value: '1-5인', label: '1-5인' },
                        { value: '5-10인', label: '5-10인' },
                        { value: '10-20인', label: '10-20인' },
                        { value: '20인 이상', label: '20인 이상' },
                      ]}
                      selectedValue={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-lg font-bold leading-5">
                  분야 <span className="pl-1 text-sm font-normal text-main">*</span>
                </span>
                <Controller
                  name="teamField"
                  control={control}
                  render={({ field }) => (
                    <Select
                      name="teamField"
                      options={[
                        { value: '', label: '선택' },
                        { value: '딥테크', label: '딥테크' },
                        { value: '핀테크', label: '핀테크' },
                        { value: '이커머스', label: '이커머스' },
                        { value: '패션/뷰티', label: '패션/뷰티' },
                        { value: '바이오/의료', label: '바이오/의료' },
                        { value: '물류/유통', label: '물류/유통' },
                        { value: '블록체인', label: '블록체인' },
                        { value: 'AI', label: 'AI' },
                        { value: 'SaaS', label: 'SaaS' },
                        { value: '플랫폼', label: '플랫폼' },
                        { value: 'ESG', label: 'ESG' },
                        { value: '라이프스타일', label: '라이프스타일' },
                        { value: '기타', label: '기타' },
                      ]}
                      selectedValue={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-[#fff] shadow-soft-shadow">
        <div className="flex justify-center p-4 lg:justify-end lg:pr-96">
          <Link href="/onBoarding/select">
            <button className="mr-4 rounded bg-grey20 px-12 py-2 text-blue-700 lg:px-16">이전</button>
          </Link>
          <button
            className={`mr-4 rounded px-12 py-2 lg:px-16 ${
              isNextButtonEnabled ? 'bg-[#2563EB] text-[#fff]' : 'bg-[#7EA5F8] text-[#fff]'
            }`}
            disabled={!isNextButtonEnabled}
            onClick={handleSubmit(onSubmit)}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  )
}
