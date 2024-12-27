'use client'
import { useEffect, useState } from 'react'
import TeamViewNotView from '../common/TeamViewNotView'
import { getTeamAnnouncements, TeamAnnouncement } from '../../api/teamApi'
import TeamViewReruitComponent from './TeamViewReruitComponent'

export default function TeamViewRecruitment({ teamName }: { teamName: string }) {
  const [announcements, setAnnouncements] = useState<TeamAnnouncement[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await getTeamAnnouncements(teamName)
      setAnnouncements(response.result.teamMemberAnnouncementItems)
    }
    fetchData()
  }, [teamName])
  return (
    <>
      {announcements.length > 0 ? (
        <div className="mt-12 flex flex-col gap-6 pb-10">
          {announcements.map((announcement) => (
            <TeamViewReruitComponent key={announcement.teamMemberAnnouncementId} announcement={announcement} />
          ))}
        </div>
      ) : (
        <div className="">
          <TeamViewNotView />
        </div>
      )}
    </>
  )
}
