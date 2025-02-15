'use client'

import Image from 'next/image'
import { useState } from 'react'
import { TeamProductView } from '../../types/teamView.types'
import ImageGalleryModal from '@/shared/ui/Modal/ImageGalleryModal'
import Link from 'next/link'

export default function TeamViewProductsComponent({ product }: { product: TeamProductView }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // 모든 이미지 경로를 하나의 배열로 모음
  const allImages = product.productRepresentImagePath
    ? [...product.teamProductImages.productSubImages.map((image) => image.productSubImagePath)]
    : []

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
    setIsImageModalOpen(true)
  }

  // 각 섹션의 데이터 존재 여부 확인
  const hasLinks = product.teamProductLinks?.length > 0
  const hasDescription = product.productDescription
  const hasImages = product.productRepresentImagePath

  // 표시할 데이터가 하나라도 있는지 확인
  const hasExpandableContent = hasLinks || hasDescription || hasImages

  return (
    <div className="flex">
      <div className="flex w-full flex-col rounded-xl bg-white px-10 py-10 ">
        <div className="flex gap-5">
          <div className="relative h-[64px] w-[64px] rounded-lg">
            <Image
              src={product.productRepresentImagePath || '/common/default_profile.svg'}
              alt="product"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
              <span className="text-xl font-semibold text-grey80">{product.productName} </span>
              <span className="hidden text-xs font-normal text-grey60 md:flex">| </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-normal text-grey60">
                  {product.productStartDate} ~ {product.productEndDate}
                </span>
                <div className="rounded-lg border border-grey30 px-2 py-1 text-sm font-normal text-grey60">
                  {product.productField}
                </div>
              </div>
            </div>
            <span className="text-grey70">{product.productLineDescription}</span>
          </div>
        </div>

        {/* 숨겨진 내용들 */}
        {isExpanded && (
          <>
            <hr className="my-8" />
            <div className="flex flex-col gap-8">
              {/* 링크 섹션 */}
              {hasLinks && (
                <div className="flex flex-col gap-3">
                  <span className="text-sm text-grey90">링크</span>
                  <div className="flex gap-5">
                    {product.teamProductLinks.map((link) => (
                      <Link
                        href={
                          link.productLinkPath.startsWith('http')
                            ? link.productLinkPath
                            : `https://${link.productLinkPath}`
                        }
                        target="_blank"
                        key={link.productLinkId}
                        className="flex w-[15rem] cursor-pointer items-center gap-2 rounded-xl bg-grey10 px-6 py-3 hover:bg-grey20"
                      >
                        <span className="text-sm text-grey80">{link.productLinkName}</span>
                        <Image src={'/common/icons/share.svg'} alt="link" width={20} height={20} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 설명 섹션 */}
              {hasDescription && (
                <div className="flex flex-col gap-3">
                  <span className="text-sm text-grey90">설명</span>
                  <div className="whitespace-pre-line rounded-xl bg-grey10 p-6 text-grey70">
                    {product.productDescription}
                  </div>
                </div>
              )}

              {/* 이미지 섹션 */}
              {product.teamProductImages.productSubImages && (
                <div className="flex flex-col gap-3">
                  <span className="text-sm text-grey90">이미지</span>

                  <div className="flex gap-5 overflow-x-auto pb-4">
                    {product.teamProductImages.productSubImages?.map((image, index) => (
                      <div
                        onClick={() => handleImageClick(index)}
                        key={index}
                        className="relative h-[138px] w-[248px] flex-none rounded-lg"
                      >
                        <Image
                          src={image.productSubImagePath}
                          alt="product"
                          fill
                          className="cursor-pointer rounded-lg object-cover"
                          sizes="248px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* 더보기/간략히 버튼 - 표시할 컨텐츠가 있을 때만 표시 */}
        {hasExpandableContent && (
          <div className="mt-8 flex justify-center">
            <span
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-grey30 py-2 pl-6 pr-8 text-sm font-normal text-grey80 hover:bg-grey10"
            >
              <Image
                src={`/common/icons/arrow-${isExpanded ? 'top' : 'bottom'}.svg`}
                alt="arrow"
                width={32}
                height={32}
              />
              {isExpanded ? '간략히' : '더보기'}
            </span>
          </div>
        )}
      </div>
      {/* 이미지 갤러리 모달 */}
      <ImageGalleryModal
        images={allImages}
        initialImageIndex={selectedImageIndex}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />
    </div>
  )
}
