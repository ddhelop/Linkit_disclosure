// src/shared/ui/Button/Button.tsx
'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Mode = 'main' | 'sub' | 'toggle' | 'main2' | 'custom' | 'black'
type Size = 'sm' | 'md' | 'lg' | 'custom'
type Type = 'button' | 'submit'
type AnimationMode = 'none' | 'main' | 'sub' | 'black' | 'grey'

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
  className = '',
}: ButtonProps) {
  const animationEffect = disabled ? {} : animationModes[animationMode] || {}

  // className을 먼저 적용하고, 그 다음에 disabled 스타일을 적용
  const baseStyles = disabled ? 'cursor-not-allowed bg-grey50 text-white rounded-xl' : buttonTheme.mode[mode]

  const sizeStyles = buttonTheme.size[size]

  return (
    <motion.button
      className={`font-semibold ${className} ${baseStyles} ${sizeStyles}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...animationEffect}
    >
      {children}
    </motion.button>
  )
}

const buttonTheme = {
  mode: {
    main: 'text-white bg-main rounded-xl',
    main2: 'bg-main2 text-white rounded-xl',
    sub: 'text-main border-main bg-white rounded-xl',
    toggle: 'text-main border-main bg-[#D3E1FE66] rounded-xl',
    black: 'bg-grey90 text-white rounded-xl',
    custom: '',
  },

  size: {
    sm: 'px-2 py-1.5 text-sm',
    md: 'px-6 py-2 text-sm',
    lg: 'px-[2rem] py-3 text-xl',
    custom: '',
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
    // 호버시 배경색 어둡게
    backgroundColor: 'rgba(37, 99, 235, 0.9)',
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
    backgroundColor: 'rgba(37, 99, 235, 0.9)',
  },
}

export const blackHoverEffect = {
  whileHover: {
    scale: 1.0,
    transition: {
      duration: 0.1, // 애니메이션이 0.1초 동안 진행
      ease: 'easeInOut', // 애니메이션을 부드럽게
    },
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
}

export const greyHoverEffect = {
  whileHover: {
    scale: 1.0,
    transition: {
      duration: 0.1, // 애니메이션이 0.1초 동안 진행
      ease: 'easeInOut', // 애니메이션을 부드럽게
    },

    backgroundColor: 'rgba(69, 69, 69, 0.9)',

    // outline: '4px solid rgba(69, 69, 69, 0.2)',
    // outlineOffset: '0.5px',
  },
}

export const animationModes = {
  none: {},
  main: mainHoverEffect,
  sub: subHoverEffect,
  black: blackHoverEffect,
  grey: greyHoverEffect,
}
