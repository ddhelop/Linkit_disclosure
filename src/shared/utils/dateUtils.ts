export const formatDate = (dateString: string): string => {
  try {
    // ISO 문자열을 Date 객체로 직접 변환
    const date = new Date(dateString)

    // 날짜가 유효한지 확인
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateString)
      return '날짜 없음'
    }

    // 항상 YYYY.MM.DD 형식으로 반환
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`
  } catch (error) {
    console.error('Error parsing date:', error)
    return '날짜 없음'
  }
}
