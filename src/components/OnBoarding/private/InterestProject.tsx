'use client'
import { useDispatch, useSelector } from 'react-redux'

import Link from 'next/link'
import { AppDispatch, RootState } from '@/app/store'
import { setSelectedLongTermFields, setSelectedShortTermFields } from '@/features/counter/onBoaringSlice'

const ShortTerm = ['공모전', '대회', '해커톤', '사이드 프로젝트', '포트폴리오', '스터디', '창업']
const LongTerm = ['공모전', '대회', '해커톤', '사이드 프로젝트', '포트폴리오', '스터디', '창업']

export default function InterestProject() {
  const dispatch = useDispatch<AppDispatch>()
  const { selectedShortTermFields, selectedLongTermFields } = useSelector((state: RootState) => state.onBoarding)

  const isNextButtonEnabled = selectedShortTermFields.length > 0 || selectedLongTermFields.length > 0

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
                  className={`border px-3 py-1 ${
                    selectedShortTermFields.includes(el)
                      ? 'border-[#2563EB] bg-[#D3E1FE66] text-[#2563EB]'
                      : 'border-[#CBD4E1] text-[#64748B]'
                  } rounded-md`}
                  onClick={() =>
                    dispatch(
                      setSelectedShortTermFields(
                        selectedShortTermFields.includes(el)
                          ? selectedShortTermFields.filter((v) => v !== el)
                          : [...selectedShortTermFields, el],
                      ),
                    )
                  }
                >
                  {el}
                </button>
              ))}
            </div>
          </div>
          {/* 장기 */}
          <div className="flex w-[80%] flex-col pt-16 sm:w-[55%]">
            <span className="text-lg font-bold leading-5">
              장기 <span className=" text-sm font-normal text-grey80">(2개월 이상)</span>
            </span>
            <div className="flex gap-x-2 pt-5">
              {LongTerm.map((el, index) => (
                <button
                  key={index}
                  className={`border px-3 py-1 ${
                    selectedLongTermFields.includes(el)
                      ? 'border-[#2563EB] bg-[#D3E1FE66] text-[#2563EB]'
                      : 'border-[#CBD4E1] text-[#64748B]'
                  } rounded-md`}
                  onClick={() =>
                    dispatch(
                      setSelectedLongTermFields(
                        selectedLongTermFields.includes(el)
                          ? selectedLongTermFields.filter((v) => v !== el)
                          : [...selectedLongTermFields, el],
                      ),
                    )
                  }
                >
                  {el}
                </button>
              ))}
            </div>
          </div>
          {/* Footer */}
          <div className="bg-white fixed bottom-0 left-0 w-full shadow-soft-shadow">
            <div className="flex justify-end p-4 pr-96">
              <Link href="/onBoarding/select">
                <button className="bg-blue-100 text-blue-700 mr-4 rounded bg-grey20 px-16 py-2">이전</button>
              </Link>
              <Link href="/onBoarding/person/role">
                <button
                  className={`mr-4 rounded px-16 py-2 ${
                    isNextButtonEnabled ? 'bg-[#2563EB] text-[#fff]' : 'bg-[#7EA5F8] text-[#fff]'
                  }`}
                  disabled={!isNextButtonEnabled}
                >
                  다음
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
