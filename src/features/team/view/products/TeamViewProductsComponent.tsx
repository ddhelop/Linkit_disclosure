'use client'

import Image from 'next/image'
import { useState } from 'react'
import { TeamProduct } from '../../types/teamView.types'

export default function TeamViewProductsComponent({ product }: { product: TeamProduct }) {
  const [isExpanded, setIsExpanded] = useState(false)

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
          <Image src="/common/default_profile.svg" alt="product" width={64} height={64} />
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-grey80">{product.productName} </span>
              <span className="text-xs font-normal text-grey60">| </span>
              <span className="text-sm font-normal text-grey60">
                {product.productStartDate} ~ {product.productEndDate}
              </span>
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
                      <div
                        key={link.productLinkId}
                        className="flex w-[15rem] cursor-pointer items-center gap-2 rounded-xl bg-grey10 px-6 py-3 hover:bg-grey20"
                      >
                        <span className="text-sm text-grey80">{link.productLinkName}</span>
                        <Image src="/common/icons/share.svg" alt="link" width={20} height={20} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 설명 섹션 */}
              {hasDescription && (
                <div className="flex flex-col gap-3">
                  <span className="text-sm text-grey90">설명</span>
                  <div className="rounded-xl bg-grey10 p-6 text-grey70">{product.productDescription}</div>
                </div>
              )}

              {/* 이미지 섹션 */}
              {product.productRepresentImagePath && (
                <div className="flex flex-col gap-3">
                  <span className="text-sm text-grey90">이미지</span>

                  <div className="flex gap-5">
                    <Image src={product.productRepresentImagePath} alt="product" width={248} height={138} />
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
    </div>
  )
}
