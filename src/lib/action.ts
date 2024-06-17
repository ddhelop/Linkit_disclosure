import { Career, Education, TeamOnBoadingFieldFormInputs } from './types'

// 로그아웃
export async function Logout(accessToken: string) {
  const response = await fetch('https://dev.linkit.im/logout', {
    method: 'DELETE',
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  return response
}

// 온보딩 데이터 fetch
export async function GetOnBoardingData(accessToken: string) {
  const response = await fetch(`https://dev.linkit.im/profile/onBoarding`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  return await response.json()
}

// 온보딩 활동지역 POST
export async function PostProfileRegion(access_token: string, selectedArea: string, selectedSubArea: string) {
  return fetch('https://dev.linkit.im/profile_region', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    credentials: 'include',
    body: JSON.stringify({
      cityName: selectedArea,
      divisionName: selectedSubArea,
    }),
  })
}

// 온보딩 역할 POST
export async function PostRoleData(accessToken: string, roleFields: string[], skillNames: string[]) {
  return fetch('https://dev.linkit.im/profile_skill', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    body: JSON.stringify({
      roleFields,
      skillNames,
    }),
  })
}

// 온보딩 학교이력 POST
export async function PostSchoolData(accessToken: string, educationList: Education[]) {
  return fetch('https://dev.linkit.im/education', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    body: JSON.stringify({ educationList }),
  })
}

// 온보딩 경력 POST
export async function PostAntecedentData(accessToken: string, careerList: Career[]) {
  return fetch('https://dev.linkit.im/antecedents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    body: JSON.stringify(careerList),
  })
}

// 온보딩 미니프로필 POST
// 여기에 fetch API로 POST 요청을 보내는 코드를 추가하세요
export async function PostProfileData(accessToken: string, payload: any) {
  return fetch('https://dev.linkit.im/mini-profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  })
}

export const RefreshAccessToken = async (accessToken: string) => {
  const response = await fetch('https://dev.linkit.im/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  const data = await response.json()
  return data.accessToken
}

// 팀 온보딩 - 희망 팀빌딩 분야
export const TeamOnBoardingField = async (accessToken: string, data: TeamOnBoadingFieldFormInputs) => {
  const response = await fetch('https://dev.linkit.im/team_profile/field/basic-team', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      teamName: data.teamName,
      sizeType: data.teamSize,
      sectorName: data.teamField,
      teamBuildingFieldNames: data.teamBuildingFieldNames,
    }),
    credentials: 'include',
  })

  const responseData = await response.json()
  return responseData
}
