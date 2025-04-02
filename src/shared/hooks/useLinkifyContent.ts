import { useEffect } from 'react'
import * as linkify from 'linkifyjs'

// LinkifyMatch 인터페이스 정의
interface LinkifyMatch {
  value: string
  type: string
  href: string
  start: number
  end: number
}

/**
 * 텍스트 콘텐츠의 URL을 자동으로 클릭 가능한 링크로 변환하는 훅
 * @param contentId 콘텐츠가 표시되는 DOM 요소의 ID
 * @param content 변환할 HTML 콘텐츠
 */
export const useLinkifyContent = (contentId: string, content?: string) => {
  useEffect(() => {
    if (!content) return

    const contentElement = document.getElementById(contentId)
    if (!contentElement) return

    // HTML 콘텐츠 설정
    contentElement.innerHTML = content

    // 기존 링크 처리
    const links = contentElement.getElementsByTagName('a')
    for (let i = 0; i < links.length; i++) {
      const link = links[i]
      const href = link.getAttribute('href')

      if (href) {
        // 내부 링크인지 확인 (Next.js 라우팅)
        const isInternalLink = href.startsWith('/')

        if (!isInternalLink) {
          // 외부 링크에 프로토콜 추가
          const hasProtocol = href.startsWith('http://') || href.startsWith('https://')
          link.href = hasProtocol ? href : `https://${href}`
          link.target = '_blank'
          link.rel = 'noopener noreferrer'
        }
      }
    }

    // 일반 텍스트에서 URL 찾아 링크화
    const textNodes: Node[] = []
    const walk = document.createTreeWalker(contentElement, NodeFilter.SHOW_TEXT, null)
    let node: Node | null
    while ((node = walk.nextNode())) {
      // 이미 링크 안에 있는 텍스트는 건너뜀
      if (node.parentNode && node.parentNode.nodeName === 'A') continue
      textNodes.push(node)
    }

    textNodes.forEach((textNode) => {
      const text = textNode.nodeValue
      if (!text) return

      // linkifyjs를 사용하여 텍스트에서 링크 찾기
      const matches = linkify.find(text) as LinkifyMatch[]
      if (!matches.length) return

      const fragment = document.createDocumentFragment()
      let lastIndex = 0

      matches.forEach((match: LinkifyMatch) => {
        // 링크 전 텍스트 추가
        if (match.start > lastIndex) {
          fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.start)))
        }

        // 링크 생성
        const link = document.createElement('a')
        link.href = match.href
        link.textContent = match.value

        // 내부 링크 확인
        const isInternalLink = match.href.startsWith('/')
        if (!isInternalLink) {
          link.target = '_blank'
          link.rel = 'noopener noreferrer'
        }

        fragment.appendChild(link)
        lastIndex = match.end
      })

      // 마지막 텍스트 추가
      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.substring(lastIndex)))
      }

      // 원래 텍스트 노드 대체
      if (textNode.parentNode) {
        textNode.parentNode.replaceChild(fragment, textNode)
      }
    })
  }, [contentId, content])
}

export default useLinkifyContent
