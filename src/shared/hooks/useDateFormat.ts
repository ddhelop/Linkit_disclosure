/**
 * 날짜를 한국어 형식(년, 월, 일)으로 포맷팅하는 훅
 */
export const useDateFormat = () => {
  /**
   * ISO 문자열을 'YYYY년 MM월 DD일' 형식으로 변환
   * @param dateString - ISO 형식의 날짜 문자열
   * @returns 'YYYY년 MM월 DD일' 형식의 문자열 또는 빈 문자열(날짜가 유효하지 않은 경우)
   */
  const formatToKorean = (dateString?: string): string => {
    if (!dateString) return ''

    try {
      const date = new Date(dateString)

      // 날짜가 유효한지 확인
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString)
        return ''
      }

      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      return `${year}년 ${month}월 ${day}일`
    } catch (error) {
      console.error('Error parsing date:', error)
      return ''
    }
  }

  return { formatToKorean }
}
