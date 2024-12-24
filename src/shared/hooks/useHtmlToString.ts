export const stripHtmlAndImages = (html: string) => {
  // 임시 div 엘리먼트 생성
  const doc = new DOMParser().parseFromString(html, 'text/html')

  // 이미지 태그 제거
  doc.querySelectorAll('img').forEach((img) => img.remove())

  // HTML을 텍스트로 변환
  const textContent = doc.body.textContent || doc.body.innerText || ''

  // 연속된 공백 제거 및 트림
  return textContent.replace(/\s+/g, ' ').trim()
}
