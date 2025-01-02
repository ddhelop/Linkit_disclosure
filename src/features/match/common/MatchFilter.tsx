export default function MatchFilter() {
  return (
    <>
      <div className="flex gap-3">
        {['전체', '팀원', '팀', '모집 공고'].map((item) => (
          <div
            key={item}
            className="cursor-pointer rounded-full border border-grey40 px-6 py-2 text-sm font-normal text-grey50"
          >
            {item}
          </div>
        ))}
      </div>
    </>
  )
}
