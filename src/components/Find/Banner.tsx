// Banner.tsx
'use client'
import { useState, useEffect } from 'react'

interface BannerProps {
  imgSrc: string
  title: string
  description: string
  scrolledTitle: string
  scrolledDescription: string
}

export default function Banner({ imgSrc, title, description, scrolledTitle, scrolledDescription }: BannerProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'cover',
        height: isScrolled ? '8rem' : '18rem',
        transition: 'height 0.3s ease',
        position: 'fixed',
        top: 0,
        // width: '100%',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center', // Center vertically
        justifyContent: 'center', // Center horizontally
      }}
      className="w-full px-4 transition-all duration-300 lg:px-12"
    >
      <div
        className=" flex flex-col pt-12 text-left transition-all duration-300 lg:w-[64rem]" // Center text horizontally
        style={{
          fontSize: isScrolled ? '1.5rem' : '3rem', // Increase the font size for the title
        }}
      >
        {isScrolled ? (
          <>
            <div className="flex items-center gap-6 pt-3">
              <p className="text-xs font-bold text-grey90 md:text-[1.2rem]">{scrolledTitle}</p>
              <p className="text-xs text-grey90 md:text-lg">{scrolledDescription}</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col pt-16">
              <p className="text-2xl font-bold text-grey90 lg:text-4xl">{title}</p>
              <p className="pt-6 text-sm text-grey90 lg:text-lg">{description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
