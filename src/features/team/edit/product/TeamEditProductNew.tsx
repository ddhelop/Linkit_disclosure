'use client'

import Input from '@/shared/ui/Input/Input'
import Select from '@/shared/ui/Select/Select'
import { productFields } from '@/shared/data/productFields'
import { useState } from 'react'
import DateRangePicker from '@/shared/ui/Select/DateRangePicker'
import { DynamicLinkList } from '@/shared/ui/DynamicLinkList/DynamicLinkList'
import Textarea from '@/shared/ui/TextArea/TextArea'
import { ImageUploader } from '@/shared/ui/ImageUploader/ImageUploader'
import { useFileValidation } from '@/shared/lib/hooks/useFileValidation'
import { Button } from '@/shared/ui/Button/Button'

import { useRouter } from 'next/navigation'
import { createTeamProduct } from '../../api/teamApi'

type ProjectSize = 'TEAM' | 'PERSONAL'

export default function TeamEditProductNew({ teamName }: { teamName: string }) {
  const [selectedField, setSelectedField] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [isOngoing, setIsOngoing] = useState<boolean>(false)
  const [mainImage, setMainImage] = useState<File | null>(null)
  const [subImages, setSubImages] = useState<{ id: number; file: File }[]>([])
  const { validateFile } = useFileValidation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const [productName, setProductName] = useState('')
  const [productLineDescription, setProductLineDescription] = useState('')
  const [isTeam, setIsTeam] = useState(true)
  const [headCount, setHeadCount] = useState('')
  const [teamComposition, setTeamComposition] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [linkSync, setLinkSync] = useState<{ title: string; url: string }[]>([])

  const onStartDateChange = (date: string) => {
    setStartDate(date)
  }

  const onEndDateChange = (date: string) => {
    setEndDate(date)
  }

  const onToggleOngoing = () => {
    setIsOngoing(!isOngoing)
  }

  const handleMainImageUpload = (file: File) => {
    const validation = validateFile(file)
    if (!validation.isValid) {
      alert(validation.error)
      return
    }
    setMainImage(file)
  }

  const handleSubImageUpload = (files: File[]) => {
    const validFiles = files.filter((file) => {
      const validation = validateFile(file)
      if (!validation.isValid) {
        alert(validation.error)
        return false
      }
      return true
    })

    if (subImages.length + validFiles.length > 4) {
      alert('최대 4개의 이미지 업로드 가능합니다.')
      return
    }

    setSubImages((prev) => [...prev, ...validFiles.map((file) => ({ id: Date.now() + Math.random(), file }))])
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      const productData = {
        productName,
        productLineDescription,
        projectSize: (isTeam ? 'TEAM' : 'PERSONAL') as ProjectSize,
        productHeadCount: isTeam ? Number(headCount) : 1,
        productTeamComposition: teamComposition,
        productStartDate: startDate,
        productEndDate: isOngoing ? null : endDate,
        isProductInProgress: isOngoing,
        teamProductLinks: linkSync.map((link) => ({
          productLinkName: link.title,
          productLinkPath: link.url,
        })),
        productDescription,
      }

      await createTeamProduct(teamName, productData, mainImage, subImages)

      alert('프로덕트가 성공적으로 생성되었습니다.')
      router.push(`/team/${teamName}/edit/products`)
    } catch (error) {
      console.error('Failed to create product:', error)
      alert('프로덕트 생성에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="mt-5 flex flex-col gap-10 rounded-xl bg-white px-[2.8rem] py-[2.4rem]">
        {/* 프로덕트명 */}
        <div className="flex w-full flex-col justify-between gap-3 ">
          <div className="flex justify-between ">
            <span className="flex gap-1 text-grey80">
              프로덕트명<p className="text-main">*</p>
            </span>
            <span className="flex items-center text-xs text-grey50">
              <p className="text-main">*</p>은 필수항목입니다
            </span>
          </div>
          <Input
            placeholder="프로덕트명을 입력해주세요"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        {/* 한줄소개 */}
        <div className="flex w-full flex-col justify-between gap-3 ">
          <span className="flex gap-1 text-grey80">
            한줄소개<p className="text-main">*</p>
          </span>

          <Input
            placeholder="프로젝트를 한 줄로 소개해주세요 (60자 이내)"
            value={productLineDescription}
            onChange={(e) => setProductLineDescription(e.target.value)}
          />
        </div>

        {/* 분야 */}
        <div className="flex w-full flex-col justify-between gap-3 ">
          <span className="flex gap-1 text-grey80">
            분야<p className="text-main">*</p>
          </span>

          <Select
            value={selectedField}
            onChange={setSelectedField}
            options={productFields.map((field) => ({ label: field, value: field }))}
            placeholder="분야를 선택해주세요"
          />
        </div>

        {/* 기간 */}
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          isOngoing={isOngoing}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          onToggleOngoing={onToggleOngoing}
        />

        {/* 링크 */}
        <div className="flex w-full flex-col justify-between gap-3 ">
          <span className="flex items-center gap-2 text-grey80">
            링크<span className="text-xs text-grey50">최대 3개까지 입력 가능해요.</span>
          </span>
          <DynamicLinkList
            initialLinks={[]}
            onChange={(links) => {
              setLinkSync(links)
            }}
          />
        </div>

        {/* 설명 */}
        <div className="flex w-full flex-col justify-between gap-3 ">
          <span className="flex gap-1 text-grey80">설명</span>
          <Textarea
            placeholder="진행한 프로덕트에 대해 자세히 설명해 주세요"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>

        {/* 이미지 */}
        <ImageUploader
          mainImage={mainImage}
          subImages={subImages}
          onMainImageUpload={handleMainImageUpload}
          onMainImageDelete={() => setMainImage(null)}
          onSubImageUpload={handleSubImageUpload}
          onSubImageDelete={(id) => setSubImages((prev) => prev.filter((img) => img.id !== id))}
          onSubImageUrlDelete={() => {}}
        />
      </div>
      <div className="flex justify-end">
        <Button mode="main" animationMode="main" className="rounded-xl font-semibold" onClick={handleSubmit}>
          저장하기
        </Button>
      </div>
    </>
  )
}
