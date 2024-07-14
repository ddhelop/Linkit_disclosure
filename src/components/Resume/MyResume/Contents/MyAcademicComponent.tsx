// MyAcademicComponent.tsx
'use client'
import { accessTokenState } from '@/context/recoil-context'
import { PostSchoolData } from '@/lib/action'
import { EducationResponse } from '@/lib/types'
import Image from 'next/image'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'

interface MyResumEducationProps {
  data: EducationResponse[]
}

export default function MyAcademicComponent({ data }: MyResumEducationProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [universityName, setUniversityName] = useState('')
  const [majorName, setMajorName] = useState('')
  const [admissionYear, setAdmissionYear] = useState('')
  const [graduationYear, setGraduationYear] = useState('')
  const [degreeName, setDegreeName] = useState('재학')
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [educationData, setEducationData] = useState(data)

  const handleAddEducation = async () => {
    const newEducation = {
      id: Date.now(), // 고유한 ID 생성
      admissionYear: parseInt(admissionYear),
      graduationYear: parseInt(graduationYear),
      universityName,
      majorName,
      degreeName,
    }

    try {
      const response = await PostSchoolData(accessToken, newEducation)
      if (response.ok) {
        setEducationData([...educationData, newEducation])
        alert('학력이 추가되었습니다.')
        setIsEditing(false)
        setUniversityName('')
        setMajorName('')
        setAdmissionYear('')
        setGraduationYear('')
        setDegreeName('재학')
      }
    } catch (error) {
      console.error('Failed to add education', error)
      // 에러 처리 로직을 추가합니다.
    }
  }

  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">학력</span>
      </div>

      {/* contents */}
      {educationData?.length === 0 ? (
        <div className="pt-[0.94rem] text-grey50">학력사항이 없습니다.</div>
      ) : (
        educationData?.map((education) => (
          <div key={education.id} className="mt-4 rounded-lg border border-grey20 p-[1.25rem]">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold text-grey100">{education.universityName}</div>
                <div className="py-[0.44rem] text-sm text-grey50">{education.majorName}</div>
                <div className="text-xs text-grey50">
                  {education.admissionYear}년 - {education.graduationYear}년 {education.degreeName}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/assets/icons/pencil.svg" width={27} height={27} alt="edit" />
                <Image src="/assets/icons/delete.svg" width={27} height={27} alt="delete" />
              </div>
            </div>
          </div>
        ))
      )}

      {/* 추가하기 모드 */}
      {isEditing && (
        <>
          <div className="mt-4 flex flex-col gap-4 rounded-lg border border-grey40 bg-grey10 p-5">
            <div className="flex gap-[0.81rem]">
              <div className="flex flex-col">
                <p className="text-sm font-normal text-grey100">학교명</p>
                <input
                  type="text"
                  className="mt-1 w-[15.31rem] rounded border border-grey40 px-[0.88rem] py-2 text-sm outline-none"
                  value={universityName}
                  onChange={(e) => setUniversityName(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <p className="text-sm font-normal text-grey100">전공명</p>
                <input
                  type="text"
                  className="mt-1 w-[15.31rem] rounded border border-grey40 px-[0.88rem] py-2 text-sm outline-none"
                  value={majorName}
                  onChange={(e) => setMajorName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-sm font-normal text-grey100">재학 기간</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="YYYY"
                  className="mt-1 w-[4.5rem] rounded border border-grey40 px-[0.88rem] py-2 text-center text-sm outline-none"
                  value={admissionYear}
                  onChange={(e) => setAdmissionYear(e.target.value)}
                />
                <p>~</p>
                <input
                  type="text"
                  placeholder="YYYY"
                  className="mt-1 w-[4.5rem] rounded border border-grey40 px-[0.88rem] py-2 text-center text-sm outline-none"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                />
                <select
                  className="mt-1 w-[4.8rem] rounded border border-grey40 px-[0.88rem] py-2 text-sm outline-none"
                  value={degreeName}
                  onChange={(e) => setDegreeName(e.target.value)}
                >
                  <option value="재학">재학</option>
                  <option value="졸업">졸업</option>
                  <option value="휴학">휴학</option>
                </select>
              </div>
            </div>
          </div>
        </>
      )}

      {/* button */}
      <div className="mt-[0.94rem] flex w-full justify-end">
        {isEditing ? (
          <div className="flex gap-4 ">
            <button
              onClick={() => {
                setIsEditing(false)
              }}
              className="rounded bg-grey30 px-4 text-sm"
            >
              취소하기
            </button>
            <button onClick={handleAddEducation} className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]">
              추가하기
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setIsEditing(true)
            }}
            className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]"
          >
            수정하기
          </button>
        )}
      </div>
    </div>
  )
}
