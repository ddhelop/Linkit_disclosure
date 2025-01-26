interface FileValidationOptions {
  maxSize?: number // in bytes
  allowedTypes?: string[]
}

interface ValidationResult {
  isValid: boolean
  error?: string
}

export const useFileValidation = (options: FileValidationOptions = {}) => {
  const {
    maxSize = 10 * 1024 * 1024, // 기본 10MB
    allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'], // 기본 이미지 타입
  } = options

  const validateFile = (file: File): ValidationResult => {
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: '파일 크기는 10MB 이하여야 합니다.',
      }
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'PNG, JPG 파일만 업로드 가능합니다.',
      }
    }

    return { isValid: true }
  }

  return { validateFile }
}
