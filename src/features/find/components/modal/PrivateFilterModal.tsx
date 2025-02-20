import { useState, useRef, useEffect } from 'react'
import Modal from '@/shared/ui/Modal/Modal'
import { jobCategoriesData } from '@/shared/data/roleSelectData'
import { addressData } from '@/shared/data/addressSelectData'
import { PrivateStatusData } from '@/shared/data/FilterData'
import Image from 'next/image'

export default function PrivateFilterModal({
  isFilterOpen,
  setIsFilterOpen,
  onApplyFilters,
  initialFilters,
  activeSection,
}: {
  isFilterOpen: boolean
  setIsFilterOpen: (isFilterOpen: boolean) => void
  onApplyFilters: (filters: { subPositions: string[]; cityNames: string[]; profileStateNames: string[] }) => void
  initialFilters: {
    subPositions: string[]
    cityNames: string[]
    profileStateNames: string[]
  }
  activeSection: 'position' | 'location' | 'status' | null
}) {
  // 포지션 관련 상태
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(initialFilters.subPositions)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // 활동 지역 관련 상태
  const [selectedAddresses, setSelectedAddresses] = useState<string[]>(initialFilters.cityNames)

  // 현재 상태 관련 상태
  const [selectedStatus, setSelectedStatus] = useState<string[]>(initialFilters.profileStateNames)

  // 선택된 소분류들의 부모 카테고리들을 계산
  const selectedCategories = Array.from(
    new Set(
      selectedSubCategories
        .map((sub) => jobCategoriesData.find((cat) => cat.subCategory.includes(sub))?.name)
        .filter(Boolean) as string[],
    ),
  )

  const positionRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isFilterOpen && activeSection) {
      const refs = {
        position: positionRef,
        location: locationRef,
        status: statusRef,
      }

      const targetRef = refs[activeSection]
      if (targetRef.current && contentRef.current) {
        const targetOffset = targetRef.current.offsetTop
        contentRef.current.scrollTop = targetOffset - 70
      }
    }
  }, [isFilterOpen, activeSection])

  // 포지션 관련 핸들러
  const handlePositionCategoryClick = (categoryName: string | 'all') => {
    if (categoryName === 'all') {
      const allSubCategories = jobCategoriesData.flatMap((cat) => cat.subCategory)
      setSelectedSubCategories(allSubCategories)
      setActiveCategory(null)
      return
    }
    setActiveCategory(activeCategory === categoryName ? null : categoryName)
  }

  const handlePositionSubCategoryClick = (subCategory: string | 'all') => {
    if (subCategory === 'all' && activeCategory) {
      const currentCategorySubItems = jobCategoriesData.find((cat) => cat.name === activeCategory)?.subCategory || []
      setSelectedSubCategories((prev) => {
        const otherCategories = prev.filter((sub) => !currentCategorySubItems.includes(sub))
        const isAllSelected = currentCategorySubItems.every((sub) => prev.includes(sub))
        return isAllSelected ? otherCategories : [...otherCategories, ...currentCategorySubItems]
      })
      return
    }

    setSelectedSubCategories((prev) =>
      prev.includes(subCategory) ? prev.filter((sub) => sub !== subCategory) : [...prev, subCategory],
    )
  }

  // 활동 지역 관련 핸들러
  const handleAddressClick = (address: string | 'all') => {
    if (address === 'all') {
      setSelectedAddresses((prev) => (prev.length === addressData.length ? [] : addressData.map((addr) => addr.name)))
      return
    }

    setSelectedAddresses((prev) =>
      prev.includes(address) ? prev.filter((addr) => addr !== address) : [...prev, address],
    )
  }

  // 현재 상태 관련 핸들러
  const handleStatusClick = (status: string) => {
    if (status === 'all') {
      setSelectedStatus((prev) =>
        prev.length === PrivateStatusData.length ? [] : PrivateStatusData.map((status) => status),
      )
      return
    }
    setSelectedStatus((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  // 필터 적용 핸들러
  const handleApplyFilters = () => {
    onApplyFilters({
      subPositions: selectedSubCategories,
      cityNames: selectedAddresses,
      profileStateNames: selectedStatus,
    })
    setIsFilterOpen(false)
  }

  // 초기화 핸들러
  const handleReset = () => {
    setSelectedSubCategories(initialFilters.subPositions)
    setSelectedAddresses(initialFilters.cityNames)
    setSelectedStatus(initialFilters.profileStateNames)
    setActiveCategory(null)
  }

  return (
    <Modal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
      <div className="flex h-full flex-col md:h-[34rem] md:w-[41rem]">
        {/* 헤더 */}
        <div className="px-6 pt-6">
          <div className="flex justify-center font-semibold text-grey80">필터</div>
          <hr className="mt-4 border-grey40" />
        </div>

        {/* 스크롤 가능한 컨텐츠 영역 */}
        <div ref={contentRef} className="flex-1 overflow-y-auto px-6 pb-10">
          <div className="flex flex-col gap-8">
            {/* 포지션 섹션 */}
            <div ref={positionRef} className="mt-4 flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-grey80">포지션</h3>
                <p className="text-xs font-normal text-grey50">대분류를 먼저 선택해주세요</p>
              </div>

              {/* 대분류 리스트 */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-normal text-grey60">대분류</h3>
                <ul className="flex flex-wrap gap-2">
                  {jobCategoriesData.map((category) => (
                    <li
                      key={category.name}
                      onClick={() => handlePositionCategoryClick(category.name)}
                      className={`cursor-pointer rounded-md px-5 py-2 text-sm ${
                        selectedCategories.includes(category.name)
                          ? ' bg-[#EDF3FF] text-main'
                          : activeCategory === category.name
                            ? 'bg-grey20 text-grey70'
                            : 'bg-grey10 text-grey50'
                      }`}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 소분류 리스트 */}
              {activeCategory && (
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs font-normal text-grey60">소분류</h3>
                  <ul className="flex flex-wrap gap-3 ">
                    {/* 전체 */}
                    <li
                      onClick={() => handlePositionSubCategoryClick('all')}
                      className={`cursor-pointer rounded-full border px-5 py-2 text-sm ${
                        jobCategoriesData
                          .find((cat) => cat.name === activeCategory)
                          ?.subCategory.every((sub) => selectedSubCategories.includes(sub))
                          ? 'border-[#B5CDFF] bg-[#EDF3FF] text-main'
                          : 'bg-grey10 text-grey50'
                      }`}
                    >
                      전체
                    </li>
                    {jobCategoriesData
                      .find((category) => category.name === activeCategory)
                      ?.subCategory.map((sub) => (
                        <li
                          key={sub}
                          onClick={() => handlePositionSubCategoryClick(sub)}
                          className={`cursor-pointer rounded-full border px-5 py-2 text-sm ${
                            selectedSubCategories.includes(sub)
                              ? 'border-[#B5CDFF] bg-[#EDF3FF] text-main'
                              : 'bg-grey10 text-grey50'
                          }`}
                        >
                          {sub}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 활동 지역 섹션 */}
            <div ref={locationRef} className="flex flex-col gap-5">
              <h3 className="font-semibold text-grey80">활동 지역</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleAddressClick('all')}
                  className={`cursor-pointer rounded-full border px-5 py-2 text-sm ${
                    selectedAddresses.length === addressData.length
                      ? 'border-[#B5CDFF] bg-[#EDF3FF] text-main'
                      : 'border-grey40 bg-grey20 text-grey50'
                  }`}
                >
                  전체
                </button>
                {addressData.map((address) => (
                  <button
                    key={address.name}
                    onClick={() => handleAddressClick(address.name)}
                    className={`cursor-pointer rounded-full border px-5 py-2 text-sm ${
                      selectedAddresses.includes(address.name)
                        ? 'border-[#B5CDFF] bg-[#EDF3FF] text-main'
                        : 'border-grey40 bg-grey20 text-grey50'
                    }`}
                  >
                    {address.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 현재 상태 섹션 */}
            <div ref={statusRef} className="flex flex-col gap-3">
              <h3 className="font-semibold text-grey80">현재 상태</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleStatusClick('all')}
                  className={`cursor-pointer rounded-full border px-5 py-2 text-sm ${
                    selectedStatus.length === PrivateStatusData.length
                      ? 'border-[#B5CDFF] bg-[#EDF3FF] text-main'
                      : 'border-grey40 bg-grey20 text-grey50'
                  }`}
                >
                  전체
                </button>

                {PrivateStatusData.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusClick(status)}
                    className={`cursor-pointer rounded-full border px-5 py-2 text-sm ${
                      selectedStatus.includes(status)
                        ? 'border-[#B5CDFF] bg-[#EDF3FF] text-main'
                        : 'border-grey40 bg-grey20 text-grey50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 고정 버튼 영역 */}
        <div className="sticky bottom-0 mt-auto border-t border-grey40 bg-white px-6 py-4">
          <div className="flex w-full items-center gap-3">
            <button
              onClick={handleReset}
              className="flex w-[30%] items-center justify-center gap-1 rounded-lg border border-grey40 px-2 py-[0.81rem] hover:bg-grey10"
            >
              <Image src="/common/icons/reset.svg" alt="초기화" width={16} height={16} />
              <p className="text-sm font-normal text-grey80">초기화</p>
            </button>
            <button
              onClick={handleApplyFilters}
              className="flex w-[70%] items-center justify-center gap-1 rounded-lg bg-main py-[0.81rem] font-semibold text-white hover:brightness-95"
            >
              <p>적용하기</p>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
