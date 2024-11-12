import NewPortFolio from '@/features/profile/edit/components/portfolio/NewPortFolio'

export default function NewPortFolioPage() {
  return (
    <div className="pl-[4.25rem] pr-[8.69rem] pt-[3.75rem]">
      <label className="text-xl font-bold">포트폴리오 작성</label>

      <div className="mt-5 rounded-xl">
        <NewPortFolio />
      </div>
    </div>
  )
}
