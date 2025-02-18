'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ProjectComponentProps {
  projectName: string
  projectSize: 'PERSONAL' | 'TEAM'
  projectLineDescription: string
  projectStartDate: string
  projectEndDate: string
  isProjectInProgress: boolean
  projectRoles: string[]
  projectRepresentImagePath: string
  profilePortfolioId: number
  isEdit?: boolean
  onDelete?: (portfolioId: number) => Promise<void>
  emailId?: string
}

export default function ProjectComponent({
  projectName,
  projectSize,
  projectLineDescription,
  projectStartDate,
  projectEndDate,
  projectRoles,
  projectRepresentImagePath,
  profilePortfolioId,
  isEdit = false,
  onDelete,
  emailId,
}: ProjectComponentProps) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div
      className="group relative flex gap-6 rounded-xl border border-transparent bg-white px-6 py-7 hover:border-main"
      onMouseLeave={() => setShowMenu(false)}
    >
      {/* More Icon - Only shown when isEdit is true */}
      {isEdit && (
        <div className="absolute right-5 top-5 hidden group-hover:block">
          <div className="relative">
            <Image
              src="/common/icons/more_row.svg"
              width={22}
              height={22}
              alt="more"
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault()
                setShowMenu(!showMenu)
              }}
            />

            {showMenu && (
              <div className="absolute left-0 top-[calc(100%+0.5rem)] z-50 w-[5.5rem] rounded-lg border border-grey30 bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.10)]">
                <Link
                  href={`/profile/edit/portfolio/new?id=${profilePortfolioId}`}
                  className="flex w-full items-center justify-center py-2 text-sm text-grey70 hover:bg-grey10"
                >
                  수정하기
                </Link>
                <button
                  className="flex w-full items-center justify-center py-2 text-sm text-[#FF5B5B] hover:bg-grey10"
                  onClick={async (e) => {
                    e.preventDefault()
                    if (onDelete) {
                      await onDelete(profilePortfolioId)
                      setShowMenu(false)
                    }
                  }}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <Link
        href={
          isEdit
            ? `/profile/edit/portfolio/new?id=${profilePortfolioId}`
            : `/${emailId}/portfolio/${profilePortfolioId}`
        }
        className="flex w-full gap-6"
      >
        <div className="relative aspect-[16/9] w-[120px] max-w-[256px] rounded-lg md:w-[256px]">
          <Image
            src={projectRepresentImagePath || '/common/images/no_thumbnail.svg'}
            alt="thumbnail"
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <span className="max-w-[75%] text-lg font-semibold">{projectName}</span>
            <span className="flex items-center rounded-[62.5rem] bg-[#D3E1FE] px-[0.88rem] text-xs">
              {projectSize === 'TEAM' ? '팀' : '개인'}
            </span>
          </div>

          <div className="mt-3 text-xs font-normal text-grey60">{projectLineDescription}</div>

          <div className="mt-[1.12rem] flex gap-1 text-xs text-grey70">
            <span className="text-grey60">기간 | </span>
            {projectStartDate} ~ {projectEndDate}
          </div>
          <div className="mt-2 flex gap-1 text-xs text-grey70">
            <span className="text-grey60">역할 |</span> {projectRoles.join(', ')}
          </div>
        </div>
      </Link>
    </div>
  )
}
