// src/shared/utils/formatPhoneNumber.ts

export function formatPhoneNumber(input: string): string {
  // 숫자만 남기고, 길이 제한 (최대 11자리)
  const cleaned = input.replace(/\D/g, '').slice(0, 11)

  // 전화번호 포맷팅
  return cleaned.replace(/(\d{3})(\d{0,4})(\d{0,4})/, (match, p1, p2, p3) => {
    return `${p1}${p2 ? `-${p2}` : ''}${p3 ? `-${p3}` : ''}`
  })
}
