import { Button } from '@/shared/ui/Button/Button'

export default function TeamViewNotView() {
  return (
    <div className="mt-[6.25rem] flex h-full w-full flex-col items-center">
      <p className="text-sm text-grey60">팀을 나타낼 수 있는 정보들을 적어보세요.</p>
      <Button
        animationMode="black"
        mode="black"
        size="custom"
        className="mt-8 rounded-full px-10 py-3 text-base font-semibold"
      >
        작성하기
      </Button>
    </div>
  )
}
