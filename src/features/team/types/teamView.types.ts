export interface TeamMember {
  profileCurrentStates: [
    {
      profileStateName: string
    },
    {
      profileStateName: string
    },
  ]
  profileImagePath: string | null
  memberName: string
  isProfilePublic: boolean
  majorPosition: string
  regionDetail: {
    cityName: string | null
    divisionName: string | null
  }
}

export interface TeamProduct {
  teamProductId: number
  productName: string
  productLineDescription: string
  productField: string
  productStartDate: string
  productEndDate: string
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
}
