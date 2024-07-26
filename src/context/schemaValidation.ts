import * as yup from 'yup'

export const schema = yup.object({
  memberName: yup.string().required('성함을 입력해주세요.'),
  contact: yup.string().required('전화번호를 입력해주세요.'),
  code: yup.string().default(''),
  roleName: yup.string().required('직무/역할을 선택해주세요.'),
  marketingAgree: yup.boolean().default(false), // 기본값을 false로 명확하게 정의
})

// validateYear, validateYearMessage 함수를 추가
export const validateYear = (value: string): boolean => {
  const year = parseInt(value)
  return /^\d{4}$/.test(value) && year >= 1900 && year <= 2100
}

// validateYearMessage 함수를 추가
export const validateYearMessage = (value: string): string => {
  if (!/^\d{4}$/.test(value)) {
    return 'YYYY 형식으로 입력해주세요.'
  }
  const year = parseInt(value)
  if (year < 1900 || year > 2100) {
    return '1900 ~ 2100 사이의 값을 입력해주세요.'
  }
  return ''
}

// url
export const validateHttpUrl = (url: string): boolean => {
  const regex = /^http:\/\/.+/
  return regex.test(url)
}
