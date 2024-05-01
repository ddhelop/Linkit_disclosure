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

export default function OnBoardingPrivateInfo() {
  const [inputValue, setInputValue] = useState('') // State is now managed here
  const [checked, setChecked] = useState(false)

  const { register, handleSubmit, formState } = useForm<IFormData>({
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
    setChecked(!checked) // 체크박스 상태 토글
  }

  return (
    <>
      <div className="w-full h-screen bg-[#9A9A9A] flex flex-col ">
        <OnBoardingHeader />

        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full h-full sm:w-[26rem] sm:h-[43.7rem] sm:rounded-md bg-[#fff] sm:shadow-boarding-shadow p-7">
            <h2 className="pt-3 font-semibold">기본 정보를 입력해주세요.</h2>
            <div className="w-full pt-5 flex justify-center">
              <Image
                src={'/assets/login/Default profile.svg'}
                width={84}
                height={84}
                alt="default profile"
                className="cursor-pointer"
              />
            </div>

            <form className="flex flex-col items-center" onSubmit={handleSubmit(onClickSubmit)}>
              <div className="w-[90%] pt-3">
                <h2 className="text-sm font-semibold pb-1">성함</h2>
                <InputDelete
                  placeholder="name"
                  inputValue={inputValue}
                  // onInputChange={handleInputChange}
                  onDelete={handleDelete}
                  register={register}
                  data="name"
                />
              </div>

              <div className="w-[90%] pt-4">
                <h2 className="text-sm font-semibold pb-1">전화번호</h2>
                <InputDelete
                  placeholder="phoneNumber"
                  inputValue={inputValue}
                  // onInputChange={handleInputChange}
                  onDelete={handleDelete}
                  register={register}
                  data="phoneNumber"
                />
              </div>

              <div className="w-[90%] pt-4">
                <h2 className="text-sm font-semibold pb-1">이메일</h2>
                <InputDelete
                  placeholder="email"
                  inputValue={inputValue}
                  // onInputChange={handleInputChange}
                  onDelete={handleDelete}
                  register={register}
                  data="email"
                />
              </div>

              <div className="w-[90%] pt-4">
                <h2 className="text-sm font-semibold pb-1">직무/역할</h2>
                <select className="custom-select appearance-none w-full h-[2.75rem] px-3 text-sm text-grey50 border border-grey30 rounded-md focus:border-2 focus:border-grey90 outline-none bg-no-repeat bg-right">
                  <option selected className="h-full">
                    나의 직무를 선택해주세요.
                  </option>
                  <option value="US">1</option>
                  <option value="CA">2</option>
                  <option value="FR">3</option>
                  <option value="DE">4</option>
                </select>
              </div>

              <div className="w-[90%] pt-4">
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
              <div className="w-full flex items-center cursor-pointer pt-4 justify-start pl-5" onClick={toggleCheckbox}>
                {checked ? (
                  <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Checkbox">
                      <rect y="0.5" width="13" height="13" rx="3" fill="#0F1A2A" />
                      <path id="Vector 9" d="M4 7L6 9L9.5 5.5" stroke="white" stroke-linecap="round" />
                    </g>
                  </svg>
                ) : (
                  <Image src={'/assets/login/checkbox.svg'} width={13} height={13} alt="checkbox" />
                )}
                <span className="pl-2 font-medium text-xs text-grey60 ">뉴스레터 및 마케팅 정보 수신동의</span>
              </div>
              <div className="flex w-full justify-end pr-4">
                <button className="w-36 h-9 bg-[#7EA5F8] rounded text-xs text-[#FFFFFF] mt-5 ">완료</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
