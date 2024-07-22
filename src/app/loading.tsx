'use client'
import Lottie from 'react-lottie-player'
import loadingLottie from '../../public/loading.json'
import { useEffect, useState } from 'react'

const Loading = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient && (
        <div className="flex h-screen w-full items-center justify-center bg-white">
          <Lottie loop animationData={loadingLottie} play style={{ width: '140px', height: '60px' }} />
        </div>
      )}
    </>
  )
}

export default Loading
