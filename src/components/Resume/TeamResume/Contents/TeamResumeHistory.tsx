'use client'

import { accessTokenState } from '@/context/recoil-context'
import { PostTeamHistory } from '@/lib/action'
import { HistoryResponse, TeamHistoryDataSet } from '@/lib/types'
import Image from 'next/image'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'

interface TeamHistoryProps {
  data: HistoryResponse[]
}

export default function TeamResumeHistory({ data: initialData }: TeamHistoryProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [historyOneLineIntroduction, setHistoryOneLineIntroduction] = useState('')
  const [startYear, setStartYear] = useState('')
  const [endYear, setEndYear] = useState('')
  const [inProgress, setInProgress] = useState(false)
  const [historyIntroduction, setHistoryIntroduction] = useState('')
  const [data, setData] = useState<HistoryResponse[]>(initialData)

  const accessToken = useRecoilValue(accessTokenState) || ''

  const handleSave = async () => {
    const newData: TeamHistoryDataSet = {
      historyOneLineIntroduction,
      startYear: parseInt(startYear),
      endYear: inProgress ? null : parseInt(endYear),
      inProgress,
      historyIntroduction,
    }

    try {
      const response = await PostTeamHistory(accessToken, newData)
      if (response.ok) {
        alert('팀 연혁이 성공적으로 저장되었습니다.')
        setIsEditing(false)

        // HistoryResponse 형식으로 변환
        const newHistoryResponse: HistoryResponse = {
          ...newData,
          endYear: newData.endYear ?? newData.startYear, // endYear가 null이면 startYear로 설정 (임시 조치)
        }

        setData((prevData) => [...prevData, newHistoryResponse]) // 새로운 데이터를 추가
      }
    } catch (error) {
      console.error('Failed to save team history:', error)
    }
  }

  return (
    <>
      <div className="flex w-full flex-col gap-[0.94rem] rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
        {/* Title */}
        <p className="text-lg font-semibold">연혁</p>

        <div className="flex flex-col gap-4">
          {data?.map((history, index) => (
            <div key={index} className="rounded-[0.63rem] border border-grey30 px-[1.31rem] py-[1.38rem]">
              <div className="flex justify-between">
                <div className="flex gap-[1.62rem]">
                  <p className="text-grey60">{history?.startYear}</p>
                  <div className="flex flex-col gap-1">
                    <p>{history?.historyOneLineIntroduction}</p>
                    <p className="text-sm text-grey60">{history?.historyIntroduction}</p>
                  </div>
                </div>
                <div className="flex">
                  <Image src="/assets/icons/pencil.svg" width={27} height={27} alt="edit" />
                  <Image src="/assets/icons/delete.svg" width={27} height={27} alt="delete" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {isEditing ? (
          <div className=" flex flex-col gap-[0.94rem] rounded-[0.44rem] border border-grey30 bg-grey10 p-5">
            {/* 한줄 소개 */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-normal">한줄소개</p>
              <input
                placeholder="Text Field"
                className="rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3"
                value={historyOneLineIntroduction}
                onChange={(e) => setHistoryOneLineIntroduction(e.target.value)}
              />
            </div>

            {/* 기간 */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-normal">기간</p>
              <div className="flex items-center gap-4">
                <input
                  placeholder="시작"
                  className="w-[5.5rem] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-center text-sm"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                />
                <p>~</p>
                <input
                  placeholder="종료"
                  className="w-[5.5rem] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-center text-sm"
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  disabled={inProgress}
                />
                <select
                  className="w-[5.5rem] rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 text-center text-sm"
                  value={inProgress ? '진행중' : '종료'}
                  onChange={(e) => setInProgress(e.target.value === '진행중')}
                >
                  <option value="진행중">진행중</option>
                  <option value="종료">종료</option>
                </select>
              </div>
            </div>

            {/* 설명 */}
            <div className="flex flex-col">
              <p className="text-sm font-normal">설명</p>
              <textarea
                className="mt-2 resize-none rounded-[0.44rem] border border-grey30 px-[0.88rem] py-3 "
                rows={3}
                placeholder="Text Field"
                value={historyIntroduction}
                onChange={(e) => setHistoryIntroduction(e.target.value)}
              />
            </div>
          </div>
        ) : null}

        {/* buttons */}
        <div className="flex w-full justify-end gap-2">
          {isEditing ? (
            <>
              <button
                className="bg-gray-400 rounded-[0.25rem] px-4 py-2 text-[#fff]"
                onClick={() => setIsEditing(false)}
              >
                취소하기
              </button>
              <button className="rounded-[0.25rem] bg-[#2563EB] px-4 py-2 text-[#fff]" onClick={handleSave}>
                저장하기
              </button>
            </>
          ) : (
            <button className="rounded-[0.25rem] bg-[#2563EB] px-4 py-2 text-[#fff]" onClick={() => setIsEditing(true)}>
              추가하기
            </button>
          )}
        </div>
      </div>
    </>
  )
}
