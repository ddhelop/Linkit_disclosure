'use client'

import InputDelete from '../common/onBoarding/inputDelete'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '@/context/schemaValidation'
import { IFormData } from '@/lib/types'
import './OnBoarding.css'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/hooks'

export default function OnBoardingPrivateInfo() {
  const router = useRouter()
  const { accessToken, email } = useAppSelector((state) => state.auth)

  const [inputValues, setInputValues] = useState({ memberName: '', contact: '', code: '' })

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onClickSubmit = async (data: IFormData): Promise<void> => {
    try {
      const response = await fetch(`https://dev.linkit.im/members/basic-inform`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: accessToken ? `Bearer ${accessToken}` : '',
          // Cookie: `refresh-token=${refreshToken}`,
        },
        body: JSON.stringify({
          memberName: data.memberName,
          contact: data.contact,
          roleName: data.roleName,
          marketingAgree: data.marketingAgree,
        }),
        credentials: 'include', // 쿠키를 포함시키기 위해 필요
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log('Success:', responseData)
        // handle successful submission
        router.push('/onBoarding/step1')
      } else {
        // handle unsuccessful submission
        console.error('Submission failed')
      }
    } catch (error) {
      console.error('Error caught:', error)
      // handle error
    }
  }

  const handleDelete = () => {
    setInputValues({ memberName: '', contact: '', code: '' })
  }

  const toggleCheckbox = () => {
    const currentMarketingAgree = getValues('marketingAgree') // 현재 marketingAgree 값 가져오기
    setValue('marketingAgree', !currentMarketingAgree) // 값 토글
  }

  // 모든 필드가 채워졌는지 확인하는 함수
  const isFormFilled = watch(['memberName', 'contact', 'roleName']).every((field) => field && field.trim() !== '')

  return (
    <>
      <div className="flex h-screen w-full flex-col bg-[#9A9A9A] ">
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-full w-full bg-[#fff] p-7 sm:h-[37.5rem] sm:w-[24rem] sm:rounded-md sm:shadow-boarding-shadow">
            <h2 className=" font-semibold">기본 정보를 입력해주세요.</h2>

            <form className="items-left flex flex-col" onSubmit={handleSubmit(onClickSubmit)}>
              <div className="w-[100%] pt-[1.31rem]">
                <h2 className="pb-1 text-sm font-semibold">성함</h2>
                <InputDelete
                  placeholder="name"
                  inputValue={inputValues.memberName}
                  onDelete={handleDelete}
                  register={register}
                  data="memberName"
                />
                {errors.memberName && <p className="text-red-500">{errors.memberName.message}</p>}
              </div>

              <div className="w-[100%] pt-[1.1rem]">
                <h2 className="pb-1 text-sm font-semibold">전화번호</h2>
                <InputDelete
                  placeholder="phoneNumber"
                  inputValue={inputValues.contact}
                  onDelete={handleDelete}
                  register={register}
                  data="contact"
                />
                {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}
              </div>

              <div className="w-[100%] pt-[1.1rem]">
                <h2 className="pb-1 text-sm font-semibold">이메일</h2>
                <div className="alw-full flex h-[2.75rem] items-center rounded-md border border-grey30 p-4 text-sm text-grey90 outline-none focus:border-2 focus:border-grey90">
                  <span className="text-grey50">{email}</span>
                </div>
              </div>

              <div className="w-[100%] pt-[1.1rem]">
                <h2 className="pb-1 text-sm font-semibold">직무/역할</h2>
                <select
                  {...register('roleName')}
                  className="custom-select h-[2.75rem] w-full appearance-none rounded-md border border-grey30 bg-right bg-no-repeat px-3 text-sm text-grey50 outline-none focus:border-2 focus:border-grey90"
                >
                  <option value="" className="h-full">
                    나의 직무를 선택해주세요.
                  </option>
                  <option value="기획">기획</option>
                  <option value="마케팅">마케팅</option>
                  <option value="디자인">디자인</option>
                  <option value="개발">개발</option>
                  <option value="비즈니스">비즈니스</option>
                </select>
                {errors.roleName && <p className="text-red-500">{errors.roleName.message}</p>}
              </div>

              <div className="w-[100%] pt-[1.1rem]">
                <h2 className="pb-1 text-sm font-semibold">팀원에게서 받은 초대초대가 있나요?</h2>
                <InputDelete
                  placeholder="code"
                  inputValue={inputValues.code}
                  onDelete={handleDelete}
                  register={register}
                  data="code"
                />
                {errors.code && <p className="text-red-500">{errors.code.message}</p>}
              </div>

              {/* 체크 */}
              <label className="flex items-center pt-[1.1rem]">
                <input type="checkbox" {...register('marketingAgree')} onClick={toggleCheckbox} />
                <span className="pl-2 text-xs text-grey60">뉴스레터 및 마케팅 정보 수신 동의</span>
              </label>
              {errors.marketingAgree && <p className="text-red-500">{errors.marketingAgree.message}</p>}

              <div className="flex w-full justify-end ">
                <button
                  type="submit"
                  className={`mt-7 h-9 w-36 rounded text-xs text-[#fff] ${isFormFilled ? 'bg-[#2563EB]' : 'bg-[#7EA5F8]'}`}
                  disabled={!isFormFilled}
                >
                  완료
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
