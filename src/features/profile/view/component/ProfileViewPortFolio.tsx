import { useProfile } from '@/entities/profile/model/ProfileContext'
import { EditableContainer } from './common/EditableContainer'
import Image from 'next/image'

export default function ProfileViewPortFolio() {
  const { profileData } = useProfile()
  const isMyProfile = profileData?.isMyProfile
  const portfolioItems = profileData?.profilePortfolioItems || []

  return (
    <EditableContainer
      isEditable={isMyProfile}
      editPath="/profile/edit/portfolio"
      className="flex w-[95%] flex-col gap-5 rounded-xl bg-white px-[2.75rem] py-[1.88rem]"
    >
      <h1 className="font-semibold">포트폴리오</h1>
      <div className="flex flex-row flex-wrap gap-2">
        {/* 데이터가 없을 시 */}
        {portfolioItems.length === 0 && (
          <div className="flex w-full items-center text-sm text-grey60">
            수정 버튼을 눌러 내용을 작성하면 매칭 가능성이 높아져요
          </div>
        )}
        {profileData?.profilePortfolioItems.map((portfolio) => (
          <div
            className="flex w-[49%] flex-col gap-3 rounded-xl border border-grey30 p-5"
            key={portfolio.profilePortfolioId}
          >
            <div className="relative h-[9.5rem] w-full  rounded-xl">
              <Image
                src={
                  portfolio.projectRepresentImagePath && portfolio.projectRepresentImagePath !== ''
                    ? portfolio.projectRepresentImagePath
                    : '/common/images/portfolio_default_img.svg'
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
          </div>
        ))}
      </div>
    </EditableContainer>
  )
}
