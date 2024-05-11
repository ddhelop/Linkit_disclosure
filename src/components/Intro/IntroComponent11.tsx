'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

type OpenState = {
  [key: number]: boolean
}

export default function IntroComponent11() {
  const answers = [
    '사전 예약을 한 분들은 서비스 오픈 후 회원가입까지 완료할 시~~~이 제공됩니다(확정해야 함)',
    '네, 신청해주신 대부분이 주니어 레벨이며 학부 과정인 분들도 많습니다.',
    '약 1달 뒤인 6월 30일에 서비스 오픈 예정이며, 기재해주신 연락처로 안내드릴 예정입니다.',
  ]
  const [isOpen, setIsOpen] = useState<OpenState>({})

  const toggleAccordion = (index: number) => {
    setIsOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }
  return (
    <div
      id="FAQ"
      className="relative w-full snap-start h-screen flex flex-col items-center pt-32 min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden"
    >
      <div className="w-full flex flex-col items-center">
        <span className="text-[1.8rem] lg:text-[2.62rem] font-bold pt-3 leading-[3.625rem] text-center">FAQ</span>
        <span className="text-sm lg:text-xl text-grey70 font-medium pt-5 text-center lg:leading-8">
          링킷에게 궁금한점이 있다면 우측 하단 채널톡으로 문의주세요
        </span>
      </div>

      {/* Multiple FAQ entries */}
      <div className="mt-12 lg:w-auto w-[90%]">
        {[
          'Q. 사전신청은 완료했는데, 언제부터 팀빌딩이 가능한가요?',
          'Q. 경력이 없어도 신청 가능한가요?',
          'Q. 사전신청은 완료했는데, 언제부터 팀빌딩이 가능한가요?',
        ].map((question, index) => (
          <div key={index} className=" shadow-faq-shadow overflow-hidden rounded-xl mt-3">
            <motion.h2
              className="lg:w-[46.9rem] lg:h-[4.18rem] font-bold text-sm lg:text-xl bg-white p-5 cursor-pointer"
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
                  <p className="text-xs lg:text-base p-1">{answers[index]}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
