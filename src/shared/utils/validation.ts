export const validateName = (name: string) => {
  const isValidLength = name.length <= 7
  const errorMessage = !isValidLength ? '최대 7자까지 가능합니다.' : ''

  return {
    isValid: isValidLength,
    errorMessage,
  }
}

// 팀 이름 제한 (10자 이내)
export const validateTeamName = (name: string) => {
  const isValidLength = name.length <= 10
  const errorMessage = !isValidLength ? '최대 10자까지 가능합니다.' : ''

  return {
    isValid: isValidLength,
    errorMessage,
  }
}

// 추후 다른 유효성 검사 함수들 추가 가능
// export const validateEmail = (email: string) => { ... }
// export const validatePassword = (password: string) => { ... }
