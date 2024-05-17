import Image from 'next/image'
import OnBoardingHeader from '../Layout/onBoardingHeader'
import OnBoardingFooter from '../Layout/onBoardingFooter'

export default function OnBoardingStep3Person() {
  return (
    <>
      <OnBoardingHeader />
      <OnBoardingFooter />
      <div className="relative">
        <div className="fixed top-[4.5rem] z-40 h-[0.18rem] w-2/3 bg-[#2563EB]"></div>{' '}
      </div>

      <div className="flex w-full flex-col items-center py-16">
        <div className="flex w-[901px] flex-col items-center py-20">
          <div className="flex w-full justify-between text-sm font-medium leading-9 text-grey60">
            <span>가이드</span>
            <span>3/3</span>
          </div>

          <div className="flex w-full flex-col items-start leading-9">
            <span className="text-2xl font-bold">내 이력서가 거의 완성되었어요</span>
            <span className="text-grey60">다른사람들이 보는 나의 프로필이예요 수정할 사항을 완성해주세요</span>
          </div>

          <div className="flex w-full justify-between gap-14 pt-12">
            {/* left */}
            <div className="flex w-[22.18rem] flex-col rounded-lg border-[1.67px] border-grey30 p-5">
              <h2 className="text-2xl font-bold leading-9 text-grey50">
                사이드 프로젝트 함께 할<br /> 개발자를 찾고 있어요
              </h2>
              <span className="pt-2 font-medium text-grey60">D-59</span>
              <div className="flex justify-center py-3">
                <Image src={'/assets/onBoarding/addImage.svg'} width={125} height={125} alt="add_image" />
              </div>

              <div className="flex flex-col items-center">
                <span className="font-semibold text-[#2563EB]">유나</span>
                <span className="text-grey60">기획, AI 엔지니어, LLM</span>
                <div className="mt-7 bg-grey10 px-4 py-3 pr-12 text-sm text-grey50">
                  💬 &nbsp; 공동의 목표를 위해 가감없는 피드백
                </div>
                <div className="flex gap-2 pt-4">
                  <div className="font-sm flex  w-[8.7rem] justify-center rounded-md bg-grey10 px-[0.88rem] py-3 text-grey90">
                    찜하기
                  </div>
                  <div className="font-sm flex  w-[8.7rem] justify-center rounded-md bg-grey100 px-[0.88rem] py-3 text-[#fff]">
                    연락하기
                  </div>
                </div>
              </div>
            </div>

            {/* right */}
            <div className="flex w-[30.7rem] flex-col gap-11">
              {/* 제목 */}
              <div className="flex flex-col">
                <span className="font-semibold text-grey100">
                  나의 프로필 제목을 입력해주세요 <span className="font-sm text-[#FF345F]">*</span>
                </span>
                <input className="mt-[1.19rem] w-full rounded-md border border-grey30 py-3 pl-4" />
              </div>

              {/* 프로필 업로드 기간 */}
              <div className="flex flex-col">
                <span className="font-semibold text-grey100">
                  프로필 업로드 기간 <span className="font-sm text-[#FF345F]">*</span>
                </span>
                <div className="mt-[1.19rem] flex items-center gap-3">
                  <input
                    type="number"
                    defaultValue={2024}
                    className="h-8 w-[5.5rem] rounded border border-grey30 px-[0.88rem]  text-center"
                  />
                  <select className="h-8 w-[5.5rem] rounded border border-grey30 text-grey60">
                    <option value="">월</option>
                    {[...Array(12).keys()].map((month) => (
                      <option key={month + 1} value={month + 1}>
                        {month + 1}월
                      </option>
                    ))}
                  </select>
                  <select className="h-8 w-[5.5rem] rounded border border-grey30 text-grey60">
                    <option value="">일</option>
                    {[...Array(31).keys()].map((d) => (
                      <option key={d + 1} value={d + 1}>
                        {d + 1}일
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="uploadStatus"
                        value="completed"
                        className="form-radio text-blue-500"
                        defaultChecked
                      />
                      <span className="ml-2 text-grey60">마감</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="uploadStatus" value="continuous" className="form-radio text-blue-500" />
                      <span className="ml-2 text-grey60">업로드</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* 프로필 이미지 */}
              <div className="flex flex-col">
                <div>
                  <span className="font-semibold text-grey100">프로필 이미지</span>
                  <span className="font-sm pl-3 text-grey80">추천 사이즈: 512 x 512 px / JPG, PNG, 최대 2MB</span>
                </div>
                <div className="flex items-end gap-[1.19rem] pt-[1.19rem]">
                  <Image src={'/assets/onBoarding/addImage.svg'} width={125} height={125} alt="add_image" />
                  <div className="font-sm flex h-[2rem] cursor-pointer items-center rounded-md bg-[#4D82F3] px-[0.88rem] text-[#fff]">
                    이미지 업로드
                  </div>
                </div>
              </div>

              {/*  나의 가치 */}
              <div className="flex flex-col">
                <span className="font-semibold text-grey100">
                  협업 시 중요한 나의 가치를 알려주세요 <span className="font-sm text-[#FF345F]">*</span>
                </span>
                <input
                  className="mt-[1.19rem] w-full rounded-md border border-grey30 py-3 pl-4"
                  placeholder="공동의 목표를 위해 가감없는 피드백 (최대 20자)"
                />
              </div>

              {/* 스킬셋 */}
              <div className="flex flex-col">
                <span className="font-semibold text-grey100">
                  나의 스킬셋 <span className="font-sm text-[#FF345F]">*</span>
                </span>
                <input className="mt-[1.19rem] w-full rounded-md border border-grey30 py-3 pl-4" />
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
