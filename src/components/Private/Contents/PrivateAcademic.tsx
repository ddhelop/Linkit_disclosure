import { EducationResponse } from '@/lib/types'

interface MyResumEducationProps {
  data: EducationResponse[]
}

export default function PrivateAcademic({ data }: MyResumEducationProps) {
  return (
    <div className="w-full rounded-2xl bg-[#fff] px-4 py-4 shadow-resume-box-shadow sm:px-[2.06rem] sm:py-[1.38rem]">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-base font-semibold text-grey100 sm:text-lg">학력</span>
      </div>

      {/* contents */}
      {!data || data.length === 0 ? (
        <div className="pt-3 text-grey50">학력사항이 없습니다.</div>
      ) : (
        data.map((education) => (
          <div key={education.id} className="mt-3 rounded-lg border border-grey20 p-5">
            <div className="flex justify-between">
              <div>
                <div className="text-sm font-semibold text-grey100 sm:text-base">{education.universityName}</div>
                <div className="py-[0.44rem] text-xs text-grey50 sm:text-sm">{education.majorName}</div>
                <div className="text-xs text-grey50">
                  {education.admissionYear}년 ~ {education.graduationYear !== 0 && `${education.graduationYear}년`}{' '}
                  {education.degreeName}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
