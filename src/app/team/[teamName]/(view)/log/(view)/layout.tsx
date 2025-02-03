export default function TeamViewLogDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-0 flex h-[calc(100vh-4rem)] w-full flex-col bg-white">
      <div className="absolute left-0 flex h-[22.4rem] w-full">
        <div className=" w-full ">{children}</div>
      </div>
    </div>
  )
}
