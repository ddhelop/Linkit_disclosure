import Image from 'next/image'
import React from 'react'

interface TeamProduct {
  teamProductId: number
  productName: string
  productLineDescription: string
  productStartDate: string
  productEndDate: string
  isProductInProgress: boolean
  teamProductLinks: {
    productLinkId: number
    productLinkName: string
    productLinkPath: string
  }[]
  productDescription: string
}

export default function TeamProductComponent({ product }: { product: TeamProduct }) {
  return (
    <div className="flex flex-col gap-5 rounded-lg bg-white p-[1.76rem]">
      {/* 프로필 */}
      <div className="flex gap-[0.8rem]">
        <Image src="/common/default_profile.svg" alt="default profile" width={48} height={48} />

        <div className="flex flex-col justify-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-grey80">{product.productName}</span>
            <span className="text-[0.5rem] text-grey60">|</span>
            <span className="text-xs font-normal text-grey60">
              {product.productStartDate} ~ {product.isProductInProgress ? '진행 중' : product.productEndDate}
            </span>
          </div>
          <span className="text-xs text-grey70">{product.productLineDescription}</span>
        </div>
      </div>

      <hr />

      {/* 링크 */}
      <div className="flex gap-[0.8rem]">
        {product.teamProductLinks.map((link) => (
          <div
            key={link.productLinkId}
            className="flex cursor-pointer gap-1 rounded-lg bg-grey10 py-2 pl-4 pr-12 text-xs text-grey80 hover:bg-grey30"
            onClick={() => window.open(link.productLinkPath, '_blank')}
          >
            <span>{link.productLinkName}</span>
            <Image src="/common/icons/share.svg" alt="link" width={14} height={14} />
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-grey10 p-4 text-xs font-normal text-grey70">{product.productDescription}</div>
    </div>
  )
}
