import Image from 'next/image'
import { TeamAnnouncement } from '../../api/teamApi'
import Link from 'next/link'

export default function TeamViewReruitComponent({
  announcement,
  teamName,
}: {
  announcement: TeamAnnouncement
  teamName: string
}) {
  return (
    <Link
      href={`/team/${teamName}/recruit/${announcement.teamMemberAnnouncementId}`}
      className="flex flex-col rounded-xl bg-white px-10 py-5 hover:shadow-md"
    >
      <div className="flex justify-between">
        <div className="rounded-full bg-[#FFECF0] px-3 py-1 text-xs text-[#FF345F]">
          D-{announcement.announcementDDay}
        </div>
        <div className="flex gap-2 text-[#4D82F3]">
          <Image src={'/common/icons/save.svg'} alt="save" width={22} height={22} />
          <span>{announcement.announcementScrapCount}</span>
        </div>
      </div>

      <span className="mt-3 text-xl font-semibold text-grey90">{announcement.announcementTitle}</span>

      <div className="flex gap-4">
        <div className="mt-5 rounded-[0.38rem] bg-[#D3E1FE] px-4 py-1 text-sm text-main">
          {announcement.majorPosition}
        </div>
        <div className="mt-5 rounded-[0.38rem] bg-[#D3E1FE] px-4 py-1 text-sm text-main">
          {announcement.announcementSkillNames.map((skill) => skill.announcementSkillName).join(', ')}
        </div>
      </div>
    </Link>
  )
}
