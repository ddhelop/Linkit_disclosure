'use client'
import { motion } from 'framer-motion'

const ProfileViewPortFolioSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-5 border-y border-grey40 bg-white p-5 md:px-[2.75rem] md:py-[1.88rem] lg:rounded-xl lg:border">
      {/* 제목 스켈레톤 */}
      <motion.div
        className="h-6 w-24 rounded bg-gray-200"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />

      {/* 포트폴리오 아이템 스켈레톤 */}
      <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            className="flex flex-col gap-3 rounded-xl border border-grey30 p-5 md:w-[49%]"
            animate={{ opacity: [0.7, 0.9, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
          >
            {/* 이미지 영역 */}
            <motion.div
              className="h-[9.5rem] w-full rounded-xl bg-gray-200"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />

            {/* 첫째줄 */}
            <div className="flex items-center gap-3">
              <motion.div
                className="h-5 w-24 rounded bg-gray-200"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <motion.div
                className="h-6 w-16 rounded-xl bg-gray-200"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>

            {/* 둘째줄 */}
            <motion.div
              className="h-4 w-48 rounded bg-gray-200"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />

            {/* 셋째줄 */}
            <motion.div
              className="h-4 w-40 rounded bg-gray-200"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ProfileViewPortFolioSkeleton
