'use client'

import TeamViewNotView from '../../../team-view/ui/teamInfo/TeamViewNotView'
import TeamViewProductsComponent from './TeamViewProductsComponent'

import { useQuery } from '@tanstack/react-query'
import { getTeamProducts } from '../../api/teamApi'
import Link from 'next/link'
import Image from 'next/image'

export default function TeamViewProducts({ teamName }: { teamName: string }) {
  const { data } = useQuery({
    queryKey: ['teamProducts', teamName],
    queryFn: () => getTeamProducts(teamName),
  })
  const products = data?.result.teamProductViewItems

  return (
    <>
      {/* 데이터가 없을 때 */}
      {products?.length === 0 ? (
        <div className="">
          {data?.result.isTeamManager ? (
            <TeamViewNotView url="products" />
          ) : (
            <div className="mt-[3rem] flex w-full flex-col items-center font-semibold text-grey60">
              아직 작성한 내용이 없어요
            </div>
          )}
        </div>
      ) : (
        <>
          {/* 팀 로그 제목 및 수정하기 */}
          {data?.result.isTeamManager && (
            <div className="mt-7 flex w-full items-center justify-between">
              <h3 className="text-xl text-grey80">프로덕트</h3>
              <Link
                href={`/team/${teamName}/edit/products`}
                className="flex items-center gap-2 rounded-full bg-grey80 px-6 py-3 text-sm text-white hover:brightness-125"
              >
                <Image src={'/common/icons/white_pencil.svg'} alt="pencil" width={16} height={16} />
                <span>수정하기</span>
              </Link>
            </div>
          )}

          {products && products.length > 0 && (
            <div className="mt-6 flex flex-col gap-3 pb-5 lg:gap-5">
              {products?.map((product) => <TeamViewProductsComponent key={product.teamProductId} product={product} />)}
            </div>
          )}
        </>
      )}
    </>
  )
}
