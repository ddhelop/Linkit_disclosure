import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import ElementComponent from './common/ElementComponent'

export default function ProfileEditHistory() {
  return (
    <>
      <div className="flex flex-col rounded-xl bg-white px-[1.62rem] pb-7 pt-[1.87rem]">
        <Button mode="main2" animationMode="main">
          활동 추가하기
        </Button>

        {/*  */}
        <ElementComponent />
      </div>
    </>
  )
}
