export default function TeamViewLogDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-0 flex h-[calc(100vh-4rem)] w-full flex-col bg-white">
      <div
        style={{ background: 'linear-gradient(180deg, #D3E1FE -16.67%, #FFFFFF 100%)' }}
        className="absolute left-0 flex h-[22.4rem] w-full"
      >
        <div className=" w-full  py-[3.62rem]">{children}</div>
      </div>
    </div>
  )
}
