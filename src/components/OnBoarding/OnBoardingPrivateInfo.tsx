'use client'
import Image from 'next/image'
import OnBoardingHeader from '../Layout/onBoardingHeader'
import InputDelete from '../common/onBoarding/inputDelete'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '@/context/schemaValidation'
import { IFormData } from '@/lib/types'
import './OnBoarding.css'
import { useSession } from 'next-auth/react'

export default function OnBoardingPrivateInfo() {
  const [inputValue, setInputValue] = useState('') // State is now managed here
  const [checked, setChecked] = useState(false)

  const { register, handleSubmit, setValue, getValues } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onClickSubmit = (data: IFormData): void => {
    console.log(data)
  }

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value)
  // }

  const handleDelete = () => {
    setInputValue('')
  }

  const toggleCheckbox = () => {
    const currentMarketingAgree = getValues('marketingAgree') // 현재 marketingAgree 값 가져오기
    setValue('marketingAgree', !currentMarketingAgree) // 값 토글
  }

  return (
    <>
      <div className="w-full h-screen bg-[#9A9A9A] flex flex-col ">
        <OnBoardingHeader />

        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full h-full sm:w-[24rem] sm:h-[37.5rem] sm:rounded-md bg-[#fff] sm:shadow-boarding-shadow p-7">
            <h2 className=" font-semibold">기본 정보를 입력해주세요.</h2>

            <form className="flex flex-col items-left" onSubmit={handleSubmit(onClickSubmit)}>
              <div className="w-[100%] pt-[1.31rem]">
                <h2 className="text-sm font-semibold pb-1">성함</h2>
                <InputDelete
                  placeholder="name"
                  inputValue={inputValue}
                  // onInputChange={handleInputChange}
                  onDelete={handleDelete}
                  register={register}
                  data="memberName"
                />
              </div>

              <div className="w-[100%] pt-[1.1rem]">
                <h2 className="text-sm font-semibold pb-1">전화번호</h2>
                <InputDelete
                  placeholder="phoneNumber"
                  inputValue={inputValue}
                  // onInputChange={handleInputChange}
                  onDelete={handleDelete}
                  register={register}
                  data="contact"
                />
              </div>

              <div className="w-[100%] pt-[1.1rem]">
                <h2 className="text-sm font-semibold pb-1">이메일</h2>
                <div className="flex items-center alw-full h-[2.75rem] p-4 text-sm text-grey90 border border-grey30 rounded-md focus:border-2 focus:border-grey90 outline-none">
                  <span className="text-grey50">123</span>
                </div>
              </div>

              <div className="w-[100%] pt-[1.1rem]">
                <h2 className="text-sm font-semibold pb-1">직무/역할</h2>
                <select
                  {...register('roleName')}
                  className="custom-select appearance-none w-full h-[2.75rem] px-3 text-sm text-grey50 border border-grey30 rounded-md focus:border-2 focus:border-grey90 outline-none bg-no-repeat bg-right"
                >
                  <option selected className="h-full">
                    나의 직무를 선택해주세요.
                  </option>
                  <option value="US">1</option>
                  <option value="CA">2</option>
                  <option value="FR">3</option>
                  <option value="DE">4</option>
                </select>
              </div>

              <div className="w-[100%] pt-[1.1rem]">
                <h2 className="text-sm font-semibold pb-1">팀원에게서 받은 초대초대가 있나요?</h2>
                <InputDelete
                  placeholder="code"
                  inputValue={inputValue}
                  // onInputChange={handleInputChange}
                  onDelete={handleDelete}
                  register={register}
                  data="code"
                />
              </div>

              {/* 체크 */}
              <label className="pt-[1.1rem] flex items-center">
                <input type="checkbox" {...register('marketingAgree')} onClick={toggleCheckbox} />
                <span className="pl-2 text-xs text-grey60">뉴스레터 및 마케팅 정보 수신 동의</span>
              </label>

              <div className="flex w-full justify-end ">
                <button className="w-36 h-9 bg-[#7EA5F8] rounded text-xs text-[#FFFFFF] mt-7 ">완료</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
