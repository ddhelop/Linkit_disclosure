'use client'

import { useEffect, useState } from 'react'
import TeamViewNotView from '../../../team-view/ui/teamInfo/TeamViewNotView'
import TeamViewProductsComponent from './TeamViewProductsComponent'
import { TeamProductView } from '../../types/teamView.types'
import { getTeamProductsView } from '../../api/teamViewApi'
import { useTeamStore } from '../../store/useTeamStore'

export default function TeamViewProducts({ teamName }: { teamName: string }) {
  const [products, setProducts] = useState<TeamProductView[]>([])
  const { isTeamManager } = useTeamStore()

  useEffect(() => {
    const fetchTeamProducts = async () => {
      const data = await getTeamProductsView(teamName)
      setProducts(data.result.teamProductViewItems)
    }
    fetchTeamProducts()
  }, [teamName])
  return (
    <>
      {/* 데이터가 없을 때 */}
      {products.length === 0 && (
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

      {products.length > 0 && (
        <div className="mt-12 flex flex-col gap-3 pb-5 lg:gap-5">
          {products.map((product) => (
            <TeamViewProductsComponent key={product.teamProductId} product={product} />
          ))}
        </div>
      )}
    </>
  )
}
