'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function FromMyMatch() {
  return (
    <div className="flex w-full flex-col pt-12">
      <div className="flex flex-col gap-[0.31rem]">
        <h1 className="text-2xl font-bold">내가 받은 매칭</h1>
        <p className="text-grey60">공모전부터 사이드 프로젝트, 창업 초기 멤버까지 함께 할 팀원을 찾아 보세요!</p>
      </div>

      <div className="mt-[2.65rem] flex flex-col">
        <motion.div
          className="flex w-[48.5rem] cursor-pointer gap-[1.44rem] rounded-lg bg-[#fff] p-5 shadow-sm"
          whileHover={{
            y: -3,
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Image src="/assets/images/DefaultProfile.png" width={65} height={65} alt="empty" className="rounded-full" />
          <div className="flex w-full justify-between">
            <div className="flex flex-col justify-center gap-1">
              <p className="font-semibold">[발신자 이름]께 매칭 요청을 받았습니다</p>
              <p className="text-sm text-grey60">
                안녕하세요, 프로젝트 썸원의 윤성원입니다!...안녕하세요, 프로젝트 ...
              </p>
            </div>
            <p className="text-xs text-grey50">3일 전</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
