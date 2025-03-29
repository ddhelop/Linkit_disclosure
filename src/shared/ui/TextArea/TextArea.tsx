// src/shared/ui/Textarea/Textarea.tsx
'use client'

import {
  useState,
  useEffect,
  ChangeEvent,
  TextareaHTMLAttributes,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ autoResize = true, className = '', onChange, ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement>(null)
    const [height, setHeight] = useState('auto')

    // 외부 ref에 내부 ref를 연결
    useImperativeHandle(ref, () => internalRef.current!)

    const handleResize = useCallback(() => {
      if (autoResize && internalRef.current) {
        internalRef.current.style.height = 'auto'
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`
      }
    }, [autoResize])

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      handleResize()
      onChange?.(event)
    }

    useEffect(() => {
      handleResize()
    }, [props.value, handleResize])

    return (
      <textarea
        ref={internalRef}
        onChange={handleChange}
        className={`min-h-[8.5rem] resize-none whitespace-pre-wrap rounded-xl border-[1.5px] border-grey30 px-6 py-3 placeholder:text-grey40 focus:border-main focus:outline-none ${className}`}
        {...props}
      />
    )
  },
)

Textarea.displayName = 'Textarea'

export default Textarea
