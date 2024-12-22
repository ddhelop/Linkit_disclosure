'use client'

import { useEffect, useState } from 'react'
import TeamProductComponent from './TeamProductComponent'
import { getTeamProducts } from '@/features/team/api/teamApi'

export interface TeamProduct {
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

export default function TeamEditProduct({ teamName }: { teamName: string }) {
  const [products, setProducts] = useState<TeamProduct[]>([])

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
      {products.map((product) => (
        <TeamProductComponent
          key={product.teamProductId}
          product={product}
          teamName={teamName}
          onDelete={handleDeleteProduct}
        />
      ))}
    </div>
  )
}
