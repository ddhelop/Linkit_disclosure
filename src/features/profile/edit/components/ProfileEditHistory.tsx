import { Button } from '@/shared/ui/Button/Button'
import ElementComponent from './common/ElementComponent'
import Link from 'next/link'

export default function ProfileEditHistory() {
  return (
    <>
      <div className="flex flex-col rounded-xl bg-white px-[1.62rem] pb-7 pt-[1.87rem]">
        <Button mode="main2" animationMode="main">
          <Link href={'/profile/edit/history/new'}>활동 추가하기</Link>
        </Button>

        {/*  */}
        <ElementComponent />
      </div>
    </>
  )
}
