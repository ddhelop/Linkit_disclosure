'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessTokenState, authState, filteredProfilesState } from '@/context/recoil-context'
import { SkillOptions } from '@/lib/data'
import { addressData } from '@/shared/data/addressSelectData'
import SkillModal from '@/components/common/component/filter/\bSkillModal'

export default function FindMemberLeftNav() {
  const accessToken = useRecoilValue(accessTokenState) || ''
  const isAuth = useRecoilValue(authState)
  const [filteredProfiles, setFilteredProfiles] = useRecoilState(filteredProfilesState)
  const [showTeamBuildingOptions, setShowTeamBuildingOptions] = useState<boolean>(false)
  const [showRoleOptions, setShowRoleOptions] = useState<boolean>(false)
  const [showSkillModal, setShowSkillModal] = useState<boolean>(false)
  const [showMainLocationOptions, setShowMainLocationOptions] = useState<boolean>(false)
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({
    teamBuildingFieldName: [],
    jobRoleName: [],
    skillName: [],
    cityName: [],
    divisionName: [],
  })

  const TeamBuildingfilterOptions: string[] = ['공모전', '대회', '창업', '사이드 프로젝트', '포트폴리오']
  const RoleFilterOptions: string[] = ['기획·경영', '개발·데이터', '마케팅·광고', '디자인']

  const handleFilterChange = (filterType: string, filterValue: string | string[]) => {
    setSelectedFilters((prevFilters) => {
      const filters = { ...prevFilters }
      if (Array.isArray(filterValue)) {
        filters[filterType] = filterValue
      } else {
        if (filters[filterType].includes(filterValue)) {
          filters[filterType] = filters[filterType].filter((item) => item !== filterValue)
        } else {
          filters[filterType].push(filterValue)
        }
      }
      return filters
    })
  }

  const handleResetFilters = () => {
    setSelectedFilters({
      teamBuildingFieldName: [],
      jobRoleName: [],
      skillName: [],
      cityName: [],
      divisionName: [],
    })
  }

  const fetchFilteredMembers = async () => {
    const queryParams = new URLSearchParams()
    Object.entries(selectedFilters).forEach(([key, values]) => {
      values.forEach((value) => {
        queryParams.append(key, value)
      })
    })

    const query = queryParams.toString()

    if (isAuth) {
      const url = query ? `/search/private/profile/login?${query}` : '/search/private/profile/login'
      const response = await GetTeamMembersFiltering(accessToken, url)
      setFilteredProfiles(response.content)
    } else if (!isAuth && !accessToken) {
      const url = query ? `/search/private/profile?${query}` : '/search/private/profile'
      const response = await GetTeamMembersFiltering(accessToken, url)
      setFilteredProfiles(response.content)
    }
  }

  useEffect(() => {
    fetchFilteredMembers()
  }, [selectedFilters])

  useEffect(() => {
    fetchFilteredMembers()
  }, [isAuth])

  return (
    <div className="flex w-[97%]  flex-col lg:w-[17.3rem]">
      <div className="flex w-full cursor-pointer justify-end gap-1 pb-2" onClick={handleResetFilters}>
        <Image src="/assets/icons/rotate-left.svg" width={16} height={16} alt="Group 1" />
        <p className="text-sm text-grey60">필터초기화</p>
      </div>

      {/* Main Container */}
      <div className="flex w-full flex-col gap-[1.8rem] rounded-2xl bg-[#fff] px-[1.25rem] py-[1.88rem]">
        {/* 희망 팀빌딩 분야 */}
        <div className="relative flex flex-col">
          <p className="pb-2 text-sm font-semibold text-grey80">희망 팀빌딩 분야</p>
          <div
            className="flex w-full cursor-pointer justify-between rounded-[0.37rem] border border-grey40 px-4 py-2 hover:bg-grey10"
            onClick={() => setShowTeamBuildingOptions(!showTeamBuildingOptions)}
          >
            <p className="text-sm text-grey50">분야 선택</p>
            <Image src="/assets/icons/black_bottom_toggle.svg" width={10} height={8} alt="Group 1" />
          </div>

          {/* 필터 항목 */}
          {showTeamBuildingOptions && (
            <div className="absolute top-[4.5rem] z-10 flex w-full flex-col gap-2 rounded-lg border border-grey40 bg-[#fff] p-3">
              {TeamBuildingfilterOptions.map((option, index) => (
                <label key={index} className="flex cursor-pointer items-center gap-2 p-2 text-sm hover:bg-grey20">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedFilters.teamBuildingFieldName.includes(option)}
                    onChange={() => handleFilterChange('teamBuildingFieldName', option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* 직무/역할 */}
        <div className="relative flex flex-col">
          <p className="pb-2 text-sm font-semibold text-grey80">직무/역할</p>
          <div
            onClick={() => setShowRoleOptions(!showRoleOptions)}
            className="flex w-full cursor-pointer justify-between rounded-[0.37rem] border border-grey40 px-4 py-2 hover:bg-grey10"
          >
            <p className="text-sm text-grey50">희망 역할</p>
            <Image src="/assets/icons/black_bottom_toggle.svg" width={10} height={8} alt="Group 1" />
          </div>

          {/* 필터 항목 */}
          {showRoleOptions && (
            <div className="absolute top-[4.5rem] z-10 flex w-full flex-col gap-2 rounded-lg border border-grey40 bg-[#fff] p-3">
              {RoleFilterOptions.map((option, index) => (
                <label key={index} className="flex cursor-pointer items-center gap-2 p-2 text-sm hover:bg-grey20">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedFilters.jobRoleName.includes(option)}
                    onChange={() => handleFilterChange('jobRoleName', option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* 보유 역량 */}
        <div className="flex flex-col">
          <p className="pb-2 text-sm font-semibold text-grey80">보유 역량</p>
          <div
            onClick={() => setShowSkillModal(true)}
            className="flex w-full cursor-pointer justify-between rounded-[0.37rem] border border-grey40 px-4 py-2 hover:bg-grey10"
          >
            <p className="text-sm text-grey50">역량 선택</p>
            <Image src="/assets/icons/search.svg" width={19} height={8} alt="Group 1" />
          </div>
        </div>

        {/* 시/도 */}
        <div className="relative flex flex-col">
          <p className="pb-2 text-sm font-semibold text-grey80">시/도</p>
          <div
            className="flex w-full cursor-pointer justify-between rounded-[0.37rem] border border-grey40 px-4 py-2 hover:bg-grey10"
            onClick={() => setShowMainLocationOptions(!showMainLocationOptions)}
          >
            <p className="text-sm text-grey50">시/도 선택</p>
            <Image src="/assets/icons/black_bottom_toggle.svg" width={10} height={8} alt="Group 1" />
          </div>

          {/* 필터 항목 */}
          {showMainLocationOptions && (
            <div className="absolute top-[4.5rem] z-10 flex h-[15rem] w-full flex-col gap-2 overflow-auto rounded-lg border border-grey40 bg-[#fff] p-3">
              {addressData.map((option, index) => (
                <label key={index} className="flex cursor-pointer items-center gap-2 p-2 text-sm hover:bg-grey20">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedFilters.cityName.includes(option.name)}
                    onChange={() => handleFilterChange('cityName', option.name)}
                  />
                  <span>{option.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.entries(selectedFilters).flatMap(([filterType, filters]) =>
          filters.map((filter, index) => (
            <div
              key={index}
              onClick={() => handleFilterChange(filterType, filter)}
              className="flex cursor-pointer items-center rounded-[0.31rem] border border-[#2563EB] bg-[#D3E1FE66] bg-opacity-40 px-3 py-1 text-[#2563EB]"
            >
              <span>{filter}</span>
              <button className="ml-2">×</button>
            </div>
          )),
        )}
      </div>

      {/* 보유 역량 모달 */}
      <SkillModal
        show={showSkillModal}
        onClose={() => setShowSkillModal(false)}
        selectedFilters={selectedFilters.skillName}
        handleFilterChange={(filters) => handleFilterChange('skillName', filters)}
        skillOptions={SkillOptions}
      />
    </div>
  )
}

// 팀원 찾기 - 필터링
export async function GetTeamMembersFiltering(accessToken: string, url: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LINKIT_SERVER_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch filtered team members')
  }

  return await response.json()
}
