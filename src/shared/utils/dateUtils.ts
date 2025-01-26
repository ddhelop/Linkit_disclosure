export const formatDate = (dateString: string): string => {
  try {
    // ISO 문자열을 Date 객체로 직접 변환
    const date = new Date(dateString)

    // 날짜가 유효한지 확인
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateString)
      return '날짜 없음'
    }

    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))

    // 오늘
    if (diffDays === 0) {
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const ampm = hours >= 12 ? '오후' : '오전'
      const formattedHours = hours % 12 || 12
      return `${ampm} ${formattedHours}:${minutes.toString().padStart(2, '0')}`
    }

    // 어제
    if (diffDays === 1) {
      return '어제'
    }

    // 일주일 이내
    if (diffDays < 7) {
      const days = ['일', '월', '화', '수', '목', '금', '토']
      return `${days[date.getDay()]}요일`
    }

    // 일주일 이상
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`
  } catch (error) {
    console.error('Error parsing date:', error)
    return '날짜 없음'
  }
}
