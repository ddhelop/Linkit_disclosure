import { TeamMiniProfileResponse } from '@/lib/types'
import Image from 'next/image'

interface TeamResumNavProps {
  data: TeamMiniProfileResponse | null // 데이터가 null일 수 있으므로 타입을 변경합니다.
}

export default function TeamResumeNavProfile({ data }: TeamResumNavProps) {
  return (
    <div className="flex w-full flex-col rounded-2xl bg-[#fff] p-5">
      <div className="text-xs text-[#2563EB]">D-56</div>
      <div className="pt-[0.42rem] text-lg font-bold leading-[1.375rem]">{data ? data.miniProfileTitle : 'null'}</div>

      <div className="w-full pt-4">
        <span className="rounded-[0.44rem] bg-[#D3E1FE33] bg-opacity-20 px-[0.56rem] text-sm text-[#2563EB]">
          재택 가능
        </span>

        <span className="rounded-[0.44rem] bg-[#D3E1FE33] bg-opacity-20 px-[0.56rem] text-sm text-[#2563EB]">
          신입 초봉
        </span>

        <span className="rounded-[0.44rem] bg-[#D3E1FE33] bg-opacity-20 px-[0.56rem] text-sm text-[#2563EB]">
          Pre-A
        </span>
      </div>

      <div className="mt-4 flex w-full items-center gap-4 rounded-[0.44rem] bg-grey10 p-[0.62rem]">
        <div className="w-auto rounded-[14.8rem] bg-grey30 p-[0.92rem]">
          <Image src={data?.teamLogoImageUrl || '/assets/icons/flag.svg'} width={16} height={16} alt="flag" />
        </div>

        <div className="flex flex-col gap-[0.12rem] pr-9">
          <p className="text-sm font-semibold text-[#2563EB]">{data ? data.teamName : 'null'}</p>
          <div className="flex gap-3">
            <p className="text-sm text-grey60">분야 | {data ? data.sectorName : 'null'}</p>
            <p className="text-sm text-grey60">규모 | {data ? data.sizeType : 'null'}</p>
          </div>
        </div>

        <Image src="/assets/icons/gray>.svg" width={6} height={6} alt="arrow-right" />
      </div>
    </div>
  )
}
