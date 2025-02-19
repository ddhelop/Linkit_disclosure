import FindPrivateFilter from '@/features/find/components/FindPrivateFilter'
import PrivateFilterResult from '@/features/find/components/resultFilter/PrivateFilterResult'

export default function FindPrivatePage() {
  return (
    <div className={`relative w-full pb-20`}>
      {/* 고정된 배경 이미지 */}
      <div
        className="absolute right-0 top-0 h-[14.1rem] w-full"
        style={{
          backgroundImage: `url('/common/images/find_private_background.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      ></div>
      {/* 컨텐츠 컨테이너 */}
      <div className="relative flex w-full justify-center">
        <div className="flex w-[95%] flex-col pt-9 lg:w-[78%]">
          <div className="flex flex-col gap-2 px-3 lg:px-16">
            <h1 className="text-grey60">팀원 찾기</h1>
            <span className="text-2xl font-semibold text-grey90">나와 함께 할 능력 있는 팀원들을 찾아보세요</span>
          </div>

          {/* 필터 */}
          <div className="mt-[2.19rem]">
            <FindPrivateFilter />
          </div>

          {/* 필터링 결과 */}
          <div className="mt-12">
            <PrivateFilterResult />
          </div>
        </div>
      </div>
    </div>
  )
}
