'use client'
import { motion } from 'framer-motion'

const ProfileViewSkillsSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-5 border-y border-grey40 bg-white p-5 md:px-[2.75rem] md:py-[1.88rem] lg:rounded-xl lg:border">
      {/* 제목 스켈레톤 */}
      <motion.div
        className="h-6 w-24 rounded bg-gray-200"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />

      {/* 스킬 아이템 스켈레톤 */}
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className="h-8 w-[100px] rounded-[62.5rem] bg-gray-200"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  )
}

export default ProfileViewSkillsSkeleton
