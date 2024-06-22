import { EducationResponse } from '@/lib/types'
import Image from 'next/image'

interface MyResumEducationProps {
  data: EducationResponse[]
}

export default function MyAcademicComponent({ data }: MyResumEducationProps) {
  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">학력</span>
      </div>

      {/* contents */}
      {data?.length === 0 ? (
        <div className="pt-[0.94rem] text-grey50">학력사항이 없습니다.</div>
      ) : (
        data?.map((education) => (
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

      {/* button */}
      <div className="mt-[0.94rem] flex w-full justify-end">
        <button className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]">추가하기</button>
      </div>
    </div>
  )
}
