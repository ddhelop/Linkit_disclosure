// LogWritePage.tsx
import LogWriteSubmit from '@/features/profile/edit/log/components/LogWriteSubmit'
import dynamic from 'next/dynamic'

const DynamicLogWriteForm = dynamic(() => import('@/features/profile/edit/log/components/LogWriteForm'), {
  loading: () => <div>...loading</div>,
})

export default function LogWritePage() {
  return (
    <div className="pl-[4.25rem] pr-[8.69rem] pt-[3.75rem]">
      <div className="rounded-xl bg-white">
        <DynamicLogWriteForm />
      </div>
      <LogWriteSubmit />
    </div>
  )
}
