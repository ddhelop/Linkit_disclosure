import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import Link from 'next/link'
import { deleteTeamProduct } from '../../api/teamApi'
import { useToast } from '@/shared/hooks/useToast'

interface TeamProduct {
  teamProductId: number
  productName: string
  productLineDescription: string
  productStartDate: string
  productEndDate: string
  isProductInProgress: boolean
  productRepresentImagePath: string
  teamProductLinks: {
    productLinkId: number
    productLinkName: string
    productLinkPath: string
  }[]
  productDescription: string
}

interface TeamProductComponentProps {
  product: TeamProduct
  teamName: string
  onDelete: (productId: number) => void
}

export default function TeamProductComponent({ product, teamName, onDelete }: TeamProductComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toast = useToast()

  useOnClickOutside({
    refs: [menuRef],
    handler: () => setIsMenuOpen(false),
  })

  const handleClickMore = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsMenuOpen(true)
  }

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteTeamProduct(teamName, product.teamProductId)
        onDelete(product.teamProductId)
        setIsMenuOpen(false)
        toast.success('삭제에 성공했습니다.')
      } catch (error) {
        console.error('Failed to delete product:', error)
        toast.alert('삭제에 실패했습니다.')
      }
    }
  }

  return (
    <Link
      href={`/team/${teamName}/edit/products/new?id=${product.teamProductId}`}
      className="flex flex-col gap-5 rounded-lg border bg-white p-4 hover:border-main md:p-[1.76rem]"
    >
      {/* 프로필 */}
      <div className="flex items-start justify-between">
        <div className="flex gap-[0.8rem]">
          <div className="relative h-[48px] w-[48px] flex-shrink-0 rounded-lg">
            <Image
              src={product.productRepresentImagePath || '/common/default_profile.svg'}
              alt="default profile"
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="flex flex-col justify-center gap-2">
            <div className="flex items-center gap-2">
              <div className="text-sm text-grey80">{product.productName}</div>
              <span className="text-[0.5rem] text-grey60">|</span>
              <span className="text-xs font-normal text-grey60">
                {product.productStartDate} ~ {product.isProductInProgress ? '진행 중' : product.productEndDate}
              </span>
            </div>

            <span className="text-xs text-grey70">{product.productLineDescription}</span>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/common/icons/more_row.svg"
            alt="edit"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={handleClickMore}
          />

          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 top-8 z-10 flex w-[100px] flex-col rounded-lg border border-grey20 bg-white py-2 shadow-md"
            >
              <Link
                href={`/team/${teamName}/edit/products/new?id=${product.teamProductId}`}
                className="px-4 py-2 text-center text-sm text-grey80 hover:bg-grey10"
              >
                수정하기
              </Link>

              <button onClick={handleDelete} className="px-4 py-2 text-sm text-[#FF345F] hover:bg-grey10">
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>

      <hr />

      {/* 링크 */}
      {product.teamProductLinks.length > 0 && (
        <div className="flex flex-col gap-[0.8rem] md:flex-col">
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
      )}

      {/* 설명 */}
      {product.productDescription && (
        <div className="whitespace-pre-line rounded-lg bg-grey10 p-4 text-xs font-normal text-grey70">
          {product.productDescription}
        </div>
      )}
    </Link>
  )
}
