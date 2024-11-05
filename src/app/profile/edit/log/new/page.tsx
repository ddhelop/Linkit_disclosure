import LogWriteSubmit from '@/features/profile/edit/log/components/LogWriteSubmit'
import dynamic from 'next/dynamic'

// Dynamically import LogWriteForm with SSR disabled
const DynamicLogWriteForm = dynamic(() => import('@/features/profile/edit/log/components/LogWriteForm'), {
  loading: () => <div>...loading</div>,
  ssr: false,
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
