// LogWritePage.tsx
import LogWriteForm from '@/features/profile/edit/log/components/LogWriteForm'

export default function LogWritePage() {
  return (
    <div className="pl-[4.25rem] pr-[8.69rem] pt-[3.75rem]">
      <label className="text-xl font-bold">로그 작성</label>
      <div className="mt-5 rounded-xl">
        <LogWriteForm />
      </div>
    </div>
  )
}
