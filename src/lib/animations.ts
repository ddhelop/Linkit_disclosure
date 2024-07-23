// lib/animations.js
export const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}

// 랜딩 1 - 버튼 호버 효과
export const mainHoverEffect = {
  whileHover: {
    scale: 1.0,
    transition: {
      duration: 0,
    },
    outline: '4px solid rgba(37, 99, 235, 0.5)',
    outlineOffset: '2px',
  },
}

//  버튼 호버 효과
export const grayHoverEffect = {
  whileHover: {
    scale: 1.0,
    transition: {
      duration: 0,
    },
    outline: '4px solid rgba(100, 116, 139, 0.2)',
    outlineOffset: '0px',
  },
}

// 아래에서 위로 자연스럽게 올라오는 애니메이션
export const slideUpAnimation = {
  offscreen: {
    y: 20,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
  viewport: { once: true, amount: 0.5 },
}
