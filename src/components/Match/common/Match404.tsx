import Image from 'next/image'

interface Match404Props {
  message: string
}

export default function Match404({ message }: Match404Props) {
  return (
    <div className="flex w-full justify-center lg:justify-start lg:pl-72 lg:pt-16">
      <div className="flex flex-col items-center gap-3">
        <Image src="/assets/images/NotAlarm.svg" width={48} height={48} alt="empty" />
        <p className="text-sm text-grey50">{message}</p>
      </div>
    </div>
  )
}
