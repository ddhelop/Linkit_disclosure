'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GetOnBoardingData } from '@/lib/action'

const ShortTerm: string[] = ['공모전', '대회', '해커톤', '사이드 프로젝트', '포트폴리오', '스터디', '창업']

interface FormValues {
  selectedShortTermFields: string[]
}

export default function InterestProject() {
  const router = useRouter()
  const [selectedShortTermFields, setSelectedShortTermFields] = useState<string[]>([])
  const accessToken = typeof window !== 'undefined' ? window.localStorage.getItem('accessToken') : null

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        try {
          const data = await GetOnBoardingData(accessToken)
          console.log('onBoardingData', data)
          if (data && data.profileTeamBuildingFieldResponse) {
            const { teamBuildingFieldNames } = data.profileTeamBuildingFieldResponse
            setSelectedShortTermFields(teamBuildingFieldNames)
          }
        } catch (error) {
          console.error('Failed to fetch onboarding data', error)
        }
      }
    }
    fetchData()
  }, [accessToken])

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    const response = await fetch(`https://dev.linkit.im/profile_team_building_field`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        teamBuildingFieldNames: selectedShortTermFields,
      }),
      credentials: 'include', // 쿠키를 포함시키기 위해 필요
    })

    if (response.ok) {
      router.push('/onBoarding/person/location')
    }
  }

  const toggleSelection = (field: string) => {
    setSelectedShortTermFields((prevSelected) =>
      prevSelected.includes(field) ? prevSelected.filter((item) => item !== field) : [...prevSelected, field],
    )
  }

  return (
    <div>
      <div className="flex h-screen w-full flex-col overflow-hidden pt-[69px]">
        <div className="t-[69px] fixed h-[0.18rem] w-2/3 bg-[#2563EB]"></div>
        <div className="flex w-full flex-col items-center py-16">
          <div className="flex w-[80%] justify-between text-sm font-medium leading-9 text-grey60 sm:w-[55%]">
            <span>내 이력서 가이드</span>
          </div>
          <div className="flex w-[80%] flex-col items-start leading-9 sm:w-[55%]">
            <span className="text-2xl font-bold">관심있는 프로젝트를 선택해주세요</span>
            <span className="text-grey60">*중복선택 가능</span>
          </div>
          {/* 단기 */}
          <div className="flex w-[80%] flex-col pt-16 sm:w-[55%]">
            <span className="text-lg font-bold leading-5">
              단기 <span className=" text-sm font-normal text-grey80">(2개월 이내)</span>
            </span>
            <div className="flex gap-x-2 pt-5">
              {ShortTerm.map((el, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleSelection(el)}
                  className={`border px-3 py-1 ${
                    selectedShortTermFields.includes(el)
                      ? 'border-[#2563EB] bg-[#D3E1FE66] text-[#2563EB]'
                      : 'border-[#CBD4E1] text-[#64748B]'
                  } rounded-md`}
                >
                  {el}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="bg-white fixed bottom-0 left-0 w-full shadow-soft-shadow">
              <div className="flex justify-end p-4 pr-96">
                <Link href="/onBoarding/select">
                  <button type="button" className="bg-blue-100 text-blue-700 mr-4 rounded bg-grey20 px-16 py-2">
                    이전
                  </button>
                </Link>
                <button
                  type="submit"
                  className={`${selectedShortTermFields.length > 0 ? 'bg-[#2563EB]' : 'bg-[#7EA5F8]'} mr-4 rounded  px-16 py-2 text-[#fff]`}
                  disabled={!(selectedShortTermFields.length > 0)}
                >
                  다음
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
