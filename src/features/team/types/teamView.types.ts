export interface TeamProduct {
  teamProductId: number
  productName: string
  productLineDescription: string
  productField: string
  productStartDate: string
  productEndDate: string
  isProductInProgress: boolean
  productRepresentImagePath: string
  productSubImages: string[]
  teamProductLinks: [
    {
      productLinkId: number
      productLinkName: string
      productLinkPath: string
    },
  ]
  productDescription: string
}

export interface TeamProductView {
  teamProductId: number
  productName: string
  productLineDescription: string
  productField: string
  productStartDate: string
  productEndDate: string | null
  isProductInProgress: boolean
  productRepresentImagePath: string
  teamProductLinks: [
    {
      productLinkId: number
      productLinkName: string
      productLinkPath: string
    },
  ]
  productDescription: string
  teamProductImages: {
    productRepresentImagePath: string
    productSubImages: [
      {
        productSubImagePath: string
      },
    ]
  }
}
