'use client'

import { useEffect, useState } from 'react'
import TeamViewNotView from '../common/TeamViewNotView'
import TeamViewProductsComponent from './TeamViewProductsComponent'
import { TeamProduct } from '../../types/teamView.types'
import { getTeamProducts } from '../../api/teamViewApi'

export default function TeamViewProducts({ teamName }: { teamName: string }) {
  const [products, setProducts] = useState<TeamProduct[]>([])
  useEffect(() => {
    const fetchTeamProducts = async () => {
      const data = await getTeamProducts(teamName)
      setProducts(data.result.teamProductItems)
      console.log(data.result.teamProductItems)
    }
    fetchTeamProducts()
  }, [teamName])
  return (
    <>
      {/* 데이터가 없을 때 */}
      {products.length === 0 && (
        <div className="">
          <TeamViewNotView />
        </div>
      )}

      {products.length > 0 && (
        <div className="mt-12 flex flex-col gap-5">
          {products.map((product) => (
            <TeamViewProductsComponent key={product.teamProductId} product={product} />
          ))}
        </div>
      )}
    </>
  )
}
