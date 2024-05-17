export default function OnBoardingStep3Person() {
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center">
        <div className="flex w-[838px] flex-col items-center py-20">
          <div className="flex w-full justify-between text-sm font-medium leading-9 text-grey60">
            <span>가이드</span>
            <span>3/3</span>
          </div>

          <div className="flex w-full flex-col items-start leading-9">
            <span className="text-2xl font-bold">내 이력서가 거의 완성되었어요</span>
            <span className="text-grey60">다른사람들이 보는 나의 프로필이예요 수정할 사항을 완성해주세요</span>
          </div>

          <div className="flex w-full justify-between">
            {/* left */}
            <div className="flex w-[22.18rem] flex-col rounded-lg border-[1.67px] border-grey30">
              <h2>
                사이드 프로젝트 함께 할<br /> 개발자를 찾고 있어요
              </h2>
            </div>
            {/* right */}
            <div className="flex w-[30.7rem]"></div>
          </div>
        </div>
      </div>
    </>
  )
}
