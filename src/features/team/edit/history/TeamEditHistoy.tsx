import Image from 'next/image'

export default function TeamEditHistoy() {
  return (
    <div className="mt-5 flex flex-col gap-5">
      <div className="rounded-xl bg-white px-10 py-5">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-grey80">연혁명연혁명</span>
            <span className="text-xs font-normal text-grey60">2024.10~2024.11</span>
          </div>
          <Image src="/common/icons/more_row.svg" alt="delete" width={20} height={20} className="cursor-pointer" />
        </div>
      </div>
    </div>
  )
}
