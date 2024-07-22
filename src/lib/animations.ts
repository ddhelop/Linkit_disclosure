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

export const hoverEffect = {
  whileHover: {
    scale: 1.0,
    transition: {
      duration: 0,
    },
    outline: '4px solid rgba(37, 99, 235, 0.5)',
    outlineOffset: '2px',
  },
}
