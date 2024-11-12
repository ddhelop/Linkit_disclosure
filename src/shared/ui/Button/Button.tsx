// src/shared/ui/Button/Button.tsx
'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Mode = 'main' | 'sub' | 'toggle' | 'main2'
type Size = 'sm' | 'md' | 'lg'
type Type = 'button' | 'submit'
type AnimationMode = 'none' | 'main' | 'sub'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  mode?: Mode
  size?: Size
  type?: Type
  animationMode?: AnimationMode
  className?: string
}

export function Button({
  children,
  disabled,
  onClick,
  mode = 'main',
  type = 'button',
  size = 'md',
  animationMode = 'none',
  className,
}: ButtonProps) {
  // 애니메이션 효과를 disabled 상태에 따라 조건적으로 설정
  const animationEffect = disabled ? {} : animationModes[animationMode] || {}

  return (
    <motion.button
      className={`${buttonTheme.size[size]} rounded-[0.25rem] border text-center font-medium 
      ${disabled ? 'cursor-not-allowed bg-grey30 text-grey50' : `${buttonTheme.mode[mode]} `} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...animationEffect} // disabled 상태일 때 빈 객체를 전달하여 애니메이션 제거
    >
      {children}
    </motion.button>
  )
}

const buttonTheme = {
  mode: {
    main: 'text-white bg-main',
    main2: 'bg-main2 text-white',
    sub: 'text-main border-main bg-white',
    toggle: 'text-main border-main bg-[#D3E1FE66]',
  },

  size: {
    sm: 'px-2 py-1.5 text-sm',
    md: 'px-6 py-2 text-sm rounded-[0.5rem]',
    lg: 'px-[2rem] py-3 text-xl rounded-[0.75rem]',
  },
}

// 버튼 호버 효과 - 파랑색
export const mainHoverEffect = {
  whileHover: {
    scale: 1.0,
    transition: {
      duration: 0.1, // 애니메이션이 0.1초 동안 진행
      ease: 'easeInOut', // 애니메이션을 부드럽게
    },
    outline: '4px solid rgba(37, 99, 235, 0.5)',
    outlineOffset: '0.5px',
  },
}

// 새로운 애니메이션 모드 추가
export const subHoverEffect = {
  whileHover: {
    scale: 1.0,
    transition: {
      duration: 0.1, // 애니메이션이 0.1초 동안 진행
      ease: 'easeInOut', // 애니메이션을 부드럽게
    },
    outline: '4px solid rgba(37, 99, 235, 0.2)',
    outlineOffset: '0.5px',
  },
}

export const animationModes = {
  none: {},
  main: mainHoverEffect,
  sub: subHoverEffect,
}
