export const formatYYYYMM = (value: string): string => {
  // 숫자가 아닌 문자 제거
  const numbers = value.replace(/[^\d]/g, '')

  if (numbers.length <= 4) {
    return numbers
  }

  // YYYY.MM 형식으로 변환
  const year = numbers.substring(0, 4)
  const month = numbers.substring(4, 6)

  // 월이 1-12 범위인지 확인
  if (month && (parseInt(month) < 1 || parseInt(month) > 12)) {
    return year + '.'
  }

  return numbers.length > 4 ? `${year}.${month}` : year
}

export const isValidYYYYMM = (value: string): boolean => {
  if (!value) return false

  const pattern = /^\d{4}\.(0[1-9]|1[0-2])$/
  if (!pattern.test(value)) return false

  const year = parseInt(value.split('.')[0])
  const currentYear = new Date().getFullYear()

  // 연도가 1900년부터 현재까지인지 확인
  return year >= 1900 && year <= currentYear
}
