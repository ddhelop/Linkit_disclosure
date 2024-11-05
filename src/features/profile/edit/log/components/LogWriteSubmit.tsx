import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'

export default function LogWriteSubmit() {
  return (
    <>
      <div className="mt-5 rounded-xl bg-white px-[2.88rem] pb-8 pt-7">
        <div className="flex flex-col gap-5">
          <span className="text-lg font-semibold text-grey80">설정</span>

          {/* radio */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <input
                id="default-radio-1"
                type="radio"
                name="visibility"
                value="public"
                className="h-3 w-3 appearance-none rounded-full border-gray-300 bg-gray-100 text-blue-600 ring-2 ring-gray-300 checked:border-blue-600 checked:bg-blue-600 checked:ring-2 checked:ring-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="default-radio-1" className="">
                전체공개
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="default-radio-2"
                type="radio"
                name="visibility"
                value="private"
                defaultChecked
                className="h-3 w-3 appearance-none rounded-full border-gray-300 bg-gray-100 text-main ring-2 ring-gray-300 checked:border-blue-600 checked:bg-blue-600 checked:ring-2 checked:ring-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="default-radio-2" className="">
                비공개
              </label>
            </div>
          </div>

          <p className="mt-1 text-sm text-grey60">모든 사람이 이 글을 볼 수 있어요</p>
        </div>
      </div>

      <div className="mt-5 flex w-full justify-between">
        <Link href="/profile/edit/log">
          <Button mode="sub" animationMode="sub" className="">
            목록으로
          </Button>
        </Link>

        <Button mode="main" animationMode="main" className="">
          저장하기
        </Button>
      </div>
    </>
  )
}
