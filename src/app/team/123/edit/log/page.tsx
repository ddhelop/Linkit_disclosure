import TeamEditLog from '@/features/team/edit/log/TeamEditLog'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'

export default function TeamEditLogPage() {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold">팀 로그</h1>
      <p className="pt-2 text-xs font-normal text-grey60">팀에 대한 설명이나 강점 등을 자유롭게 작성해 보세요</p>
      <Link href="/team/edit/123/log/new">
        <Button mode="main2" animationMode="main" className="mt-5 w-full rounded-[0.69rem] py-2">
          + 추가하기
        </Button>
      </Link>
      <TeamEditLog />
    </div>
  )
}
