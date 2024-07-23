'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

type OpenState = {
  [key: number]: boolean
}

export default function IntroComponent11() {
  const answers = [
    '내 이력서는 초기 단계부터 함께 할 팀원을 구할 경우, 또는 기존 팀에 합류를 원할 경우 적합한 프로필입니다!',
    '팀 소개서는 현재 있는 팀에 필요로 하는 역량을 가진 팀원을 구하고 있는 경우 적합한 프로필입니다!',
    '오른쪽 하단 채널톡에 의견을 남겨주시면, 적극적으로 반영하도록 하겠습니다. ',
    '서드파티 쿠키 차단을 해제하고 다시 로그인 해보신 후, 안될 경우 문의하기로 연락 부탁드립니다:)',
    '회원가입을 마쳐도 내 이력서/팀 소개서 내 다른 항목을 추가로 채워야 프로필 완성도가 올라가며, 80%이상이 되어야 매칭 요청을 보낼 수 있습니다! ',
    '학과 입력 시 OO전공이 아닌 ‘XX과’라고 입력해야 정상적으로 넘어가게 됩니다!',
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
      className="relative flex h-screen min-h-screen w-full snap-mandatory snap-start snap-always flex-col items-center justify-start overflow-hidden overflow-x-auto bg-white bg-opacity-50 bg-cover bg-no-repeat py-20 lg:justify-center lg:pt-20"
    >
      <div className="flex w-full flex-col items-center">
        <span className="text-center text-[1.6rem] font-bold leading-[3.625rem] lg:text-[2.62rem]">FAQ</span>
        <span className="pt-2 text-center text-xs font-medium text-grey70 lg:text-xl lg:leading-8">
          링킷에게 궁금한점이 있다면 우측 하단 채널톡으로 문의하세요!
        </span>
      </div>

      {/* Multiple FAQ entries */}
      <div className="mt-5 w-[47rem] bg-white lg:mt-12">
        {[
          'Q. 내 이력서는 팀 소개서와 무엇이 다른가요?',
          'Q. 팀 소개서는 내 이력서와 무엇이 다른가요?',
          'Q. 추가되었으면 하는 기능이 있는데 요청 가능한가요?',
          'Q. 회원가입이 제대로 되지 않는 것 같아요',
          'Q. 회원가입을 완료했는데 매칭 요청이 보내지지 않아요',
          'Q. 학력을 입력하려고 하는데 오류가 떠요',
        ].map((question, index) => (
          <div key={index} className="mt-2 w-full overflow-hidden rounded-xl shadow-faq-shadow">
            <motion.h2
              className="flex w-full cursor-pointer items-center justify-between bg-white p-5 text-sm font-bold lg:h-[4.18rem] lg:w-[46.9rem] lg:text-xl"
              onClick={() => toggleAccordion(index)}
              initial={false}
            >
              {question}
              <span className="float-right">
                {isOpen[index] ? (
                  <Image src="/assets/icons/up>.svg" alt="Minus Icon" width={8} height={4} />
                ) : (
                  <Image src="/assets/icons/bottom>.svg" alt="Plus Icon" width={8} height={4} />
                )}
              </span>
            </motion.h2>
            <AnimatePresence>
              {isOpen[index] && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-[70%] pb-5 pl-5"
                >
                  <p className="p-1 text-xs lg:text-base">{answers[index]}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
