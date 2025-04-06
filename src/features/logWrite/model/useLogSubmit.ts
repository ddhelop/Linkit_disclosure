import { createTeamLog, updateTeamLog } from '@/features/team/api/teamApi'
import { useToast } from '@/shared/hooks/useToast'
import { useRouter } from 'next/navigation'
import { updateProfileLog } from '../api/updateProfileLog'
import { createProfileLog } from '../api/createProfileLog'

export const useLogSubmit = ({
  logId,
  teamName,
  domainType,
}: {
  logId: string | null
  teamName: string | null
  domainType: 'PROFILE' | 'TEAM'
}) => {
  const toast = useToast()
  const router = useRouter()

  const submit = async ({
    logTitle,
    logContent,
    isLogPublic,
  }: {
    logTitle: string
    logContent: string
    isLogPublic: boolean
  }) => {
    if (!logTitle.trim() || !logContent.trim()) {
      toast.alert('제목과 내용을 입력해주세요.')
      return
    }

    try {
      const logData = { logTitle, logContent, isLogPublic }

      if (logId) {
        if (teamName) {
          await updateTeamLog(teamName, parseInt(logId), logData)
        } else {
          await updateProfileLog(logId, logData)
        }
      } else {
        if (teamName) {
          await createTeamLog(teamName, logData)
        } else {
          await createProfileLog(logData)
        }
      }

      toast.success('로그가 성공적으로 저장되었습니다.')
      router.push(teamName ? `/team/${teamName}/edit/log` : '/profile/edit/log')
    } catch (error: any) {
      console.error('로그 저장 실패:', error)
      toast.alert(error?.message || '로그 저장에 실패했습니다.')
    }
  }

  return { submit }
}
