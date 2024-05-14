import Image from 'next/image'
import { motion } from 'framer-motion'

export default function IntroComponent10() {
  const reviews = [
    { message: '좋은 팀원 만나서 데이터 분석 공모전에서 수상했습니다!', author: '취업준비생 최00님' },
    { message: '사이드 프로젝트를 함께 할 팀원을 만났어요', author: '대학생 권00님' },
    {
      message:
        '링킷에서 만난 팀원과 1월 이후로 다른 AI 프로젝트도 진행하고 있는데, 덕분에 좋은 팀원과 일하고 있습니다!',
      author: '대학원생 박00님',
    },
    {
      message: '캐글 대회에 혼자 도전했다가 성과가 안나서, 여기서 팀원 구해서 준비하고 있습니다!',
      author: '대학생 이00님',
    },
    {
      message: '데이터 분석 관련 국비지원 교육 수강하면서 링킷에서 만난 팀원과 함께 실무 프로젝트 진행하고 있어요',
      author: '대학생 윤00님',
    },
    {
      message: 'PLC 제어설계 직무 취업을 준비하며 팀 프로젝트 경험을 쌓을 수 있었습니다! 감사합니다!',
      author: '취업준비생 최00님',
    },
    { message: '팀에 필요한 개발 인력을 구했습니다.', author: '스타트업 대표 배00님' },
  ]

  const loopAnimation = {
    animate: {
      x: ['0%', '-100%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 20,
          ease: 'linear',
        },
      },
    },
  }

  const burstAnimation = {
    initial: {
      scale: 0.9,
      opacity: 0.6,
    },
    animate: {
      scale: 1.8,
      opacity: [0.3, 1, 0.6],
      transition: {
        duration: 3,
        ease: 'easeInOut',
        loop: Infinity,
      },
    },
  }

  return (
    <motion.div
      className="relative w-full snap-start h-screen  flex flex-col items-center pt-20 lg:pt-32 min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1,
        duration: 0.9,
        ease: 'easeOut',
      }}
    >
      <motion.div variants={burstAnimation} initial="initial" whileInView="animate" className="absolute inset-0">
        <Image src={'/assets/intro/section10bg.png'} alt="line" layout="fill" objectFit="cover" />
      </motion.div>

      <Image
        src={'/assets/intro/linkitRec.png'}
        width={921}
        height={921}
        alt="linkit"
        className="absolute bottom-0 left-20 right-0 mx-auto hidden lg:flex"
      />

      <div className="w-full flex flex-col items-center z-10">
        <span className="text-[1.6rem] lg:text-[2.62rem] font-bold pt-3 lg:leading-[3.625rem] text-center">
          링킷이
          <br />
          다시 돌아왔습니다
        </span>
        <span className="text-xs lg:text-xl text-grey70 font-medium pt-3 lg:pt-5 text-center leading-8">
          베타서비스 이후 더욱 발전된 링킷의 팀빌딩 서비스를 만나보세요!
        </span>
      </div>

      <motion.div
        className="flex gap-5 w-full overflow-hidden pt-16 z-10 [mask-image:linear-gradient(to_right,transparent_0%,_black_128px,_black_calc(100%-200px),transparent_100%)]"
        {...loopAnimation}
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            className="flex flex-col min-w-min w-auto justify-center bg-white-alpha-50 rounded-lg px-5 py-4 shadow-rec-shadow whitespace-nowrap"
          >
            <span className="text-sm lg:text-lg">{review.message}</span>
            <span className="w-full text-center lg:text-right pt-2 text-xs lg:text-sm">{review.author}</span>
          </div>
        ))}
        {reviews.map((review, index) => (
          <div
            key={index + reviews.length}
            className="flex flex-col min-w-min w-auto justify-center bg-white-alpha-50 rounded-lg px-5 py-4 shadow-rec-shadow whitespace-nowrap"
          >
            <span className="text-sm lg:text-lg">{review.message}</span>
            <span className="w-full text-center lg:text-right pt-2 text-xs lg:text-sm">{review.author}</span>
          </div>
        ))}
      </motion.div>

      <div className="hidden lg:flex gap-5 w-full justify-start overflow-x-hidden mr-[30rem] pt-16 z-10">
        <div className="flex flex-col w-[37.9rem] h-[5.5rem] bg-white-alpha-50 rounded-lg px-10 py-4 shadow-rec-shadow">
          <span className="text-lg">좋은 팀원 만나서 데이터 분석 공모전에서 수상했습니다!</span>
          <span className="w-full text-right pt-2 text-sm">취업준비생 최00님</span>
        </div>

        <div className="flex flex-col w-[37.9rem] h-[5.5rem] bg-white-alpha-50] rounded-lg px-10 py-4 shadow-rec-shadow">
          <span className="text-lg">덕분에 창업팀 초기 멤버를 구했어요. 정말 감사합니다</span>
          <span className="w-full text-right pt-2 text-sm">예비 창업가 김00님</span>
        </div>
      </div>
    </motion.div>
  )
}
