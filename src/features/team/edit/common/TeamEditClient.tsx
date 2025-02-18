'use client'

import TeamEditLeftMenu from './TeamEditLeftMenu'

type TeamEditClientProps = {
  children: React.ReactNode
  params: { teamName: string }
}

export default function TeamEditClient({ children, params }: TeamEditClientProps) {
  return (
    <div className="flex bg-white">
      <aside className="fixed top-16 hidden h-[calc(100vh-4rem)] w-[28%] flex-col items-end pr-[4.5rem] pt-[3.75rem] md:flex">
        <div
          className="rounded-xl border border-grey30 p-4"
          style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
        >
          <TeamEditLeftMenu params={params} />
        </div>
      </aside>

      <main className="min-h-[calc(100vh-4rem)] w-full bg-[#EDF3FF] p-3 md:ml-[28%] md:w-3/4 md:pb-32 md:pl-[4.25rem] md:pr-[8.69rem] md:pt-[3.62rem]">
        {children}
      </main>
    </div>
  )
}
