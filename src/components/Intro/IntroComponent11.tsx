'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

type OpenState = {
  [key: number]: boolean
}

export default function IntroComponent11() {
  const [isOpen, setIsOpen] = useState<OpenState>({})

  const toggleAccordion = (index: number) => {
    setIsOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }
  return (
    <div className="relative w-full snap-start h-screen flex flex-col items-center pt-32 min-h-[540px] md:min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden">
      <div className="w-full flex flex-col items-center">
        <span className="text-[2.62rem] font-bold pt-3 leading-[3.625rem] text-center">FAQ</span>
        <span className="text-xl text-grey70 font-medium pt-5 text-center leading-8">
          링킷에게 궁금한점이 있다면 우측 하단 채널톡으로 문의주세요
        </span>
      </div>

      {/* Multiple FAQ entries */}
      <div className="mt-12">
        {[
          'Q. 사전 예약을 하면 어떤 혜택이 있나요?',
          'Q. 경력이 없어도 신청 가능한가요?',
          'Q. 사전신청은 완료했는데, 언제부터 팀빌딩이 가능한가요?',
        ].map((question, index) => (
          <div key={index} className="shadow-faq-shadow overflow-hidden rounded-xl mt-3">
            <motion.h2
              className="w-[46.9rem] h-[4.18rem] font-bold text-xl bg-white p-5 cursor-pointer"
              onClick={() => toggleAccordion(index)}
              initial={false}
            >
              {question}
              <span className="float-right">{isOpen[index] ? '-' : '+'}</span>
            </motion.h2>
            <AnimatePresence>
              {isOpen[index] && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pl-5 pb-5"
                >
                  <p>
                    {index === 0
                      ? '사전 예약을 한 분들은 서비스 오픈 후 회원가입까지 완료할 시~~~이 제공됩니다(확정해야 함)'
                      : 'answer'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
