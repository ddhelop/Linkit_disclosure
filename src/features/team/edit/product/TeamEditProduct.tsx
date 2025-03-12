'use client'

import { useEffect, useState } from 'react'
import TeamProductComponent from './TeamProductComponent'
import { getTeamProducts } from '@/features/team/api/teamApi'
import NotContentsUi from '@/features/profile/edit/components/common/NotContentsUi'
import { TeamProductView } from '../../types/team.types'

export default function TeamEditProduct({ teamName }: { teamName: string }) {
  const [products, setProducts] = useState<TeamProductView[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getTeamProducts(teamName)
        setProducts(data.result.teamProductItems)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }

    fetchProducts()
  }, [teamName])

  const handleDeleteProduct = (deletedProductId: number) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.teamProductId !== deletedProductId))
  }

  return (
    <div className="mt-5 flex flex-col gap-5">
      {products.length > 0 ? (
        products.map((product) => (
          <TeamProductComponent
            key={product.teamProductId}
            product={product}
            teamName={teamName}
            onDelete={handleDeleteProduct}
          />
        ))
      ) : (
        <NotContentsUi />
      )}
    </div>
  )
}
