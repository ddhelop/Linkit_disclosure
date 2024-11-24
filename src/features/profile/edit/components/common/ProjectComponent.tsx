import Image from 'next/image'

interface ProjectComponentProps {
  projectName: string
  projectSize: 'PERSONAL' | 'TEAM'
  projectLineDescription: string
  projectStartDate: string
  projectEndDate: string
  isProjectInProgress: boolean
  projectRoles: string[]
  projectRepresentImagePath: string
}

export default function ProjectComponent({
  projectName,
  projectSize,
  projectLineDescription,
  projectStartDate,
  projectEndDate,
  projectRoles,
  projectRepresentImagePath,
}: ProjectComponentProps) {
  return (
    <div className="relative flex gap-6 rounded-xl bg-grey10 px-6 py-7">
      <Image
        src="/common/icons/more_row.svg"
        width={22}
        height={22}
        alt="more"
        className="absolute right-5 top-5 cursor-pointer"
      />
      <Image
        src={projectRepresentImagePath || '/common/images/no_thumbnail.svg'}
        width={256}
        height={144}
        alt="thumbnail"
      />
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">{projectName}</span>
          <span className="flex items-center rounded-[62.5rem] bg-[#D3E1FE] px-[0.88rem] text-xs">
            {projectSize === 'TEAM' ? '팀' : '개인'}
          </span>
        </div>

        <div className="mt-3 text-xs font-normal text-grey60">{projectLineDescription}</div>

        <div className="mt-[1.12rem] flex gap-1 text-xs text-grey70">
          <span className="text-grey60">기간 | </span>
          {projectStartDate} ~ {projectEndDate}
        </div>
        <div className="mt-2 flex gap-1 text-xs text-grey70">
          <span className="text-grey60">역할 |</span> {projectRoles.join(', ')}
        </div>
      </div>
    </div>
  )
}
