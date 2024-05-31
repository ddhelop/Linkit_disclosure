'use client'
import { accessTokenState, myDataState } from '@/context/recoil-context'
import { useRecoilState } from 'recoil'

export default function FetchSetting({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const [myData, setMyData] = useRecoilState(myDataState)

  return <div>{children}</div>
}
