'use client'

import { useState } from 'react'
import TeamViewNotView from '../../../team-view/ui/teamInfo/TeamViewNotView'
import TeamViewProductsComponent from './TeamViewProductsComponent'

import { useTeamStore } from '../../store/useTeamStore'
import { TeamProductView } from '../../types/team.types'
import { useQuery } from '@tanstack/react-query'
import { getTeamProducts } from '../../api/teamApi'

export default function TeamViewProducts({ teamName }: { teamName: string }) {
  const { isTeamManager } = useTeamStore()

  const { data } = useQuery({
    queryKey: ['teamProducts', teamName],
    queryFn: () => getTeamProducts(teamName),
  })
  const products = data?.result.teamProductItems

  return (
    <>
      {/* 데이터가 없을 때 */}
      {products?.length === 0 && (
        <div className="">
          {isTeamManager ? (
            <TeamViewNotView />
          ) : (
            <div className="mt-[3rem] flex w-full justify-center font-semibold text-grey60">
              아직 작성한 내용이 없어요
            </div>
          )}
        </div>
      )}

      {products && products.length > 0 && (
        <div className="mt-12 flex flex-col gap-3 pb-5 lg:gap-5">
          {products?.map((product) => <TeamViewProductsComponent key={product.teamProductId} product={product} />)}
        </div>
      )}
    </>
  )
}
