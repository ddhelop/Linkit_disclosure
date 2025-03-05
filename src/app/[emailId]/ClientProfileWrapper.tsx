'use client'
import React, { useEffect, useState, useRef, ReactNode } from 'react'
import NavigationRemote from '@/features/profile/view/component/common/NavigationRemote'

type Section = {
  id: string
  label: string
}

type ClientProfileWrapperProps = {
  sections: Section[]
  children: ReactNode
}

export default function ClientProfileWrapper({ sections, children }: ClientProfileWrapperProps) {
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const [activeSection, setActiveSection] = useState('')

  const setRef = (id: string) => (el: HTMLDivElement | null) => {
    sectionsRef.current[id] = el
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = sectionsRef.current[section.id]
        if (!element) continue

        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = sectionsRef.current[sectionId]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // React.Children.map을 사용하여 각 자식에게 ref를 전달
  const childrenWithRefs = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const id = child.props.id
      if (id) {
        return (
          <div ref={setRef(id)} className="flex justify-center">
            {child}
          </div>
        )
      }
    }
    return child
  })

  return (
    <div className="relative flex w-full justify-center">
      <div className="flex w-full flex-grow flex-col gap-2 px-2 lg:gap-6">{childrenWithRefs}</div>
      <div className="hidden lg:block">
        <NavigationRemote sections={sections} activeSection={activeSection} onSectionClick={scrollToSection} />
      </div>
    </div>
  )
}
