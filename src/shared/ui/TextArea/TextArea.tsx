// src/shared/ui/Textarea/Textarea.tsx
'use client'

import { useState, useEffect, useRef, ChangeEvent, TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean // 자동으로 높이 조절하는 옵션
}

const Textarea: React.FC<TextareaProps> = ({ autoResize = true, className = '', onChange, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [height, setHeight] = useState('auto')

  const handleResize = () => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto' // 높이를 먼저 auto로 설정하여 줄어들 수 있게 함
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px` // scrollHeight로 높이 설정
    }
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleResize() // 텍스트 변경 시마다 높이 조절
    onChange && onChange(event)
  }

  useEffect(() => {
    handleResize() // 컴포넌트가 처음 렌더링될 때 높이 조절
  }, [props.value])

  return (
    <textarea
      ref={textareaRef}
      onChange={handleChange}
      className={`resize-none rounded-xl border-[1.5px] border-grey30 px-6 py-3 focus:border-main focus:outline-none ${className}`}
      {...props}
    />
  )
}

export default Textarea
