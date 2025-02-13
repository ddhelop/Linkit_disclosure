'use client'
import { getPortfolioDetail } from '@/features/profile/api/getPortfolioItems'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ImageGalleryModal from '@/shared/ui/Modal/ImageGalleryModal'

interface PortfolioDetail {
  profilePortfolioId: number
  projectName: string
  projectLineDescription: string
  projectSize: string
  projectHeadCount: number
  projectTeamComposition: string
  projectStartDate: string
  projectEndDate: string
  isProjectInProgress: boolean
  projectRoleAndContributions: [
    {
      projectRole: string
      projectContribution: string
    },
    {
      projectRole: string
      projectContribution: string
    },
  ]
  projectSkillNames: [
    {
      projectSkillName: string
    },
    {
      projectSkillName: string
    },
  ]
  projectLink: string
  projectDescription: string
  portfolioImages: {
    projectRepresentImagePath: string
    portfolioSubImages: [
      {
        projectSubImagePath: string
      },
      {
        projectSubImagePath: string
      },
    ]
  }
}

export default function PortfolioDetailPage({ params }: { params: { emailId: string; id: string } }) {
  const { id } = params
  const [portfolioDetail, setPortfolioDetail] = useState<PortfolioDetail>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    const fetchPortfolioDetail = async () => {
      window.scrollTo(0, 0)
      const response = await getPortfolioDetail(Number(id))
      setPortfolioDetail(response)
    }
    fetchPortfolioDetail()
  }, [id])

  // 모든 이미지 경로를 하나의 배열로 모음
  const allImages = portfolioDetail?.portfolioImages.projectRepresentImagePath
    ? [
        portfolioDetail.portfolioImages.projectRepresentImagePath,
        ...portfolioDetail.portfolioImages.portfolioSubImages.map((image) => image.projectSubImagePath),
      ]
    : []

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
    setIsModalOpen(true)
  }

  return (
    <div className=" px-[4.25rem] py-[3.63rem]">
      <div className="rounded-xl bg-white p-12">
        {/* 프로젝트 명 */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-grey80">{portfolioDetail?.projectName}</h1>
          <span className="text-xs text-grey50"> | </span>
          <span className="text-sm font-normal text-grey60">
            {portfolioDetail?.projectStartDate} ~ {portfolioDetail?.projectEndDate}
          </span>
        </div>

        {/* 한줄 소개 */}
        <div className="mt-3">
          <p className=" text-grey70">{portfolioDetail?.projectLineDescription}</p>
        </div>

        {/* 팀 구성 */}
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-full bg-[#D3E1FE] px-[0.88rem] py-2 text-xs font-normal text-grey80">
            {portfolioDetail?.projectSize === 'PERSONAL' ? '개인' : '팀'}
          </span>
          {portfolioDetail?.projectSize === 'TEAM' && (
            <span className="text-xs font-normal text-grey80">{portfolioDetail?.projectHeadCount}인</span>
          )}
          {portfolioDetail?.projectTeamComposition && (
            <>
              <span className="text-xs text-grey50"> | </span>
              <span className="text-xs font-normal text-grey80">{portfolioDetail?.projectTeamComposition}</span>
            </>
          )}
        </div>

        {/* 구분선 */}
        <div className="my-5 mb-8 h-[1px] w-full bg-grey30 "></div>

        {/* 역할 및 기여도 */}
        <h2 className="text-sm text-grey90">역할 및 기여도</h2>
        <div className="mt-3 flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            {portfolioDetail?.projectRoleAndContributions.map((role) => (
              <div key={role.projectRole} className="flex gap-3 text-grey80">
                <span className="rounded-xl bg-grey10 px-6 py-3">{role.projectRole}</span>
                <span className="rounded-xl bg-grey10 px-6 py-3">
                  {role.projectContribution === 'HIGH'
                    ? '상'
                    : role.projectContribution === 'UPPER_MIDDLE'
                      ? '중상'
                      : role.projectContribution === 'MIDDLE'
                        ? '중'
                        : role.projectContribution === 'LOWER_MIDDLE'
                          ? '중하'
                          : role.projectContribution === 'LOW'
                            ? '하'
                            : ''}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-3"></div>
        </div>

        {/* 사용 스킬 */}
        <h2 className="mt-8 text-sm text-grey90">사용 스킬</h2>
        <div className="mt-3 flex gap-4">
          {portfolioDetail?.projectSkillNames.map((skill) => (
            <span key={skill.projectSkillName} className="rounded-xl bg-grey30 px-5 py-2 text-sm text-grey80">
              {skill.projectSkillName}
            </span>
          ))}
        </div>

        {/* 링크 */}
        {portfolioDetail?.projectLink && (
          <>
            <h2 className="mt-8 text-sm text-grey90">링크</h2>
            <div className="mt-3 flex">
              <Link
                href={
                  portfolioDetail?.projectLink
                    ? portfolioDetail.projectLink.startsWith('http')
                      ? portfolioDetail.projectLink
                      : `https://${portfolioDetail.projectLink}`
                    : '#'
                }
                target="_blank"
                className="flex gap-3 rounded-xl bg-grey10 px-7 py-3 text-sm text-grey80 hover:bg-grey20"
              >
                {portfolioDetail?.projectLink}
                <Image src="/common/icons/share.svg" alt="link" width={16} height={16} />
              </Link>
            </div>
          </>
        )}

        {/* 설명 */}
        <h2 className="mt-8 text-sm text-grey90">설명</h2>
        <div className="mt-3">
          <p className="whitespace-pre-line rounded-xl bg-grey10 p-6 text-grey70">
            {portfolioDetail?.projectDescription}
          </p>
        </div>

        {/* 이미지 */}
        {portfolioDetail?.portfolioImages.projectRepresentImagePath && (
          <>
            <h2 className="mt-8 text-sm text-grey90">이미지</h2>
            <div className="mt-3 flex flex-col gap-[1.38rem]">
              {/* 대표 이미지 */}
              <div
                className="relative h-[228px] w-[402px] cursor-pointer rounded-lg"
                onClick={() => handleImageClick(0)}
              >
                <Image
                  src={portfolioDetail.portfolioImages.projectRepresentImagePath}
                  alt="project"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              {/* 서브 이미지 */}
              <div className="flex gap-[1.38rem]">
                <div className="grid grid-cols-2 gap-[1.38rem]">
                  {portfolioDetail.portfolioImages.portfolioSubImages.map((image, index) => (
                    <div
                      key={image.projectSubImagePath}
                      className="relative h-[140px] w-[252px] cursor-pointer rounded-lg"
                      onClick={() => handleImageClick(index + 1)}
                    >
                      <Image src={image.projectSubImagePath} alt="project" fill className="rounded-lg object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 목록으로 */}
      <div className="mt-5 flex w-full justify-start">
        <Link
          href={`/${params.emailId}/portfolio`}
          className="rounded-lg border border-grey40 bg-[#FCFCFD] px-5 py-2 text-grey80 hover:bg-grey10"
        >
          목록으로
        </Link>
      </div>

      {/* 이미지 갤러리 모달 */}
      <ImageGalleryModal
        images={allImages}
        initialImageIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
