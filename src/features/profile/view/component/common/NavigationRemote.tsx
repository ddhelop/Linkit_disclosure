'use client'

import { motion } from 'framer-motion'

interface NavigationRemoteProps {
  sections: { id: string; label: string }[]
  activeSection: string
  onSectionClick: (sectionId: string) => void
}

export default function NavigationRemote({ sections, activeSection, onSectionClick }: NavigationRemoteProps) {
  return (
    <div className="sticky top-24 ml-6 h-fit">
      <div className="group relative flex flex-col items-center gap-4">
        {/* 기본 상태의 선들 */}
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            className="relative h-[2px] w-[16px] rounded-full transition-all"
          >
            <div
              className={`absolute h-[2px] w-[16px] rounded-full transition-all
                ${activeSection === section.id ? 'bg-main' : 'bg-grey40'}
                group-hover:w-0
              `}
            />
          </button>
        ))}

        {/* 호버 시 나타나는 섹션 리스트 */}
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{
            x: '0%',
            opacity: 1,
            transition: { type: 'spring', stiffness: 300, damping: 30 },
          }}
          className="absolute left-0 hidden w-[7.75rem] rounded-xl border border-grey20 bg-white p-3 
            shadow-md group-hover:block"
        >
          <ul className="flex flex-col gap-1">
            {sections.map((section) => (
              <li key={section.id} className="hober:bg-grey20">
                <button
                  onClick={() => onSectionClick(section.id)}
                  className={`flex w-full justify-start rounded-lg py-1 pl-2 text-sm transition-colors hover:bg-grey20 hover:text-grey100
                    ${activeSection === section.id ? 'text-main' : 'text-grey80'}
                  `}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
