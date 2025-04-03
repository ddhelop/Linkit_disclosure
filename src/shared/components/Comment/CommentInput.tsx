'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuthStore } from '@/shared/store/useAuthStore'
import { useToast } from '@/shared/hooks/useToast'
import { useRouter } from 'next/navigation'

interface CommentInputProps {
  onSubmit: (content: string) => Promise<void>
  initialValue?: string
  placeholder?: string
  submitLabel?: string
  onCancel?: () => void
  disabled?: boolean
}

export default function CommentInput({
  onSubmit,
  initialValue = '',
  placeholder = '댓글을 입력해 주세요.',
  submitLabel = '댓글 달기',
  onCancel,
  disabled = false,
}: CommentInputProps) {
  const [content, setContent] = useState(initialValue)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isLogin } = useAuthStore()
  const toast = useToast()
  const router = useRouter()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setContent(initialValue)
  }, [initialValue])

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [content])

  const handleSubmit = async () => {
    if (!isLogin) {
      toast.alert('로그인이 필요합니다.')
      router.push('/login')
      return
    }

    if (content.trim() === '') {
      toast.alert('댓글 내용을 입력해주세요.')
      return
    }

    try {
      setIsSubmitting(true)
      await onSubmit(content.trim())
      setContent('')
    } catch (error) {
      console.error('Failed to submit comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="min-h-[100px] w-full resize-none rounded-lg border border-grey40 bg-[#FCFCFD] px-7 py-5 text-sm text-grey90 placeholder:text-grey50 focus:border-main focus:outline-none"
        disabled={disabled || isSubmitting}
      />
      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-grey60 hover:bg-grey10 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={disabled || isSubmitting}
          >
            취소
          </button>
        )}
        <button
          onClick={handleSubmit}
          className="rounded-lg bg-main px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-grey30"
          disabled={disabled || isSubmitting || content.trim() === ''}
        >
          {isSubmitting ? '처리 중...' : submitLabel}
        </button>
      </div>
    </div>
  )
}
