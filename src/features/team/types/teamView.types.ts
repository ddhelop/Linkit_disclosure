export interface TeamMember {
  profileImagePath: string
  memberName: string
  majorPosition: string
  regionDetail: {
    cityName: string | null
    divisionName: string | null
  }
  teamMemberType: string
  teamMemberInviteState: string
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
