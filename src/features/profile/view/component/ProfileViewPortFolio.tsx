'use client'
import { useProfileView } from '@/entities/profile/model/ProfileViewContext'
import { EditableContainer } from './common/EditableContainer'
import Image from 'next/image'
import Link from 'next/link'

export default function ProfileViewPortFolio({ id }: { id?: string }) {
  const { profileData } = useProfileView()
  const isMyProfile = profileData?.isMyProfile
  const portfolioItems = profileData?.profilePortfolioItems || []

  return (
    <EditableContainer
      isEditable={isMyProfile}
      editPath="/profile/edit/portfolio"
      className="flex w-full flex-col gap-5 rounded-xl bg-white p-5 md:px-[2.75rem] md:py-[1.88rem]"
    >
      <h1 className="font-semibold">포트폴리오</h1>
      <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
        {/* 데이터가 없을 시 */}
        {portfolioItems.length === 0 &&
          (isMyProfile ? (
            <div className="flex w-full items-center text-sm text-grey60">
              수정 버튼을 눌러 내용을 작성하면 매칭 가능성이 높아져요
            </div>
          ) : (
            <div className="flex w-full items-center text-sm text-grey60">아직 추가하지 않았어요</div>
          ))}
        {profileData?.profilePortfolioItems.map((portfolio) => (
          <Link
            href={`/${profileData?.profileInformMenu.emailId}/portfolio/${portfolio.profilePortfolioId}`}
            scroll={true}
            className="flex flex-col gap-3 rounded-xl border border-grey30 p-5 hover:border-main md:w-[49%]"
            key={portfolio.profilePortfolioId}
          >
            <div className="relative h-[9.5rem] w-full  rounded-xl">
              <Image
                src={
                  portfolio.projectRepresentImagePath && portfolio.projectRepresentImagePath !== ''
                    ? portfolio.projectRepresentImagePath
                    : '/common/default_image.svg'
                }
                alt="portfolio"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            {/* 첫째줄 */}
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold">{portfolio.projectName}</p>
              <div className="rounded-xl bg-[#D3E1FE] px-[0.88rem] py-1">
                <p className="text-xs font-semibold text-grey80">
                  {portfolio.projectSize === 'PERSONAL' ? '개인' : '팀'}
                </p>
              </div>
            </div>

            {/* 둘째줄 */}
            <div className="text-xs font-normal text-grey70">
              기간 | {portfolio.projectStartDate} ~ {portfolio.projectEndDate ? portfolio.projectEndDate : '진행중'}
            </div>

            {/* 셋째줄 */}
            <div className="text-xs font-normal text-grey70">역할 | {portfolio.projectRoles.join(', ')}</div>
          </Link>
        ))}

        {portfolioItems.length > 2 && (
          <div className="mt-4 flex w-full justify-end">
            <Link
              href={`/${profileData?.profileInformMenu.emailId}/portfolio`}
              className="flex gap-1 rounded-xl bg-grey10 py-2 pl-4 pr-2 text-sm text-grey60 hover:bg-grey20"
            >
              포트폴리오 더보기
              <Image src="/common/icons/arrow-right(greyblack).svg" alt="arrow_right" width={16} height={16} />
            </Link>
          </div>
        )}
      </div>
    </EditableContainer>
  )
}
