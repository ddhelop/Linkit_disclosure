import Image from 'next/image'

export default function FindMemberLeftNav() {
  return (
    <div className="flex w-[16.3rem] flex-col">
      <div className="flex w-full cursor-pointer justify-end gap-1 pb-2">
        <Image src="/assets/icons/rotate-left.svg" width={16} height={16} alt="Group 1" />
        <p className="text-sm text-grey60">필터초기화</p>
      </div>

      {/*  */}
      <div className="flex w-full flex-col gap-[2.5rem] rounded-2xl bg-[#fff] px-[1.25rem] py-[1.88rem]">
        <div className="flex flex-col">
          <p className="pb-2 text-sm font-semibold text-grey80">희망 팀빌딩 분야</p>

          <form className="mx-auto w-full ">
            <select
              id="countries"
              className="bg-gray-50 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-lg  border border-grey40 p-2.5 text-sm text-grey50"
            >
              <option selected disabled className="">
                선택
              </option>
              <option value="PM">PM</option>
              <option value="디자이너">디자이너</option>
              <option value="프론트엔드">프론트엔드</option>
              <option value="백엔드">백엔드</option>
            </select>
          </form>
        </div>

        <div className="flex flex-col">
          <p className="pb-2 text-sm font-semibold text-grey80">활동 지역</p>
          <div className="flex w-full cursor-pointer items-center justify-center rounded-[0.37rem] border border-grey40 py-2 text-sm text-grey50">
            + 지역선택
          </div>
        </div>

        <div className="flex flex-col">
          <p className="pb-2 text-sm font-semibold text-grey80">역할</p>
          <div className="flex w-full cursor-pointer items-center justify-center rounded-[0.37rem] border border-grey40 py-2 text-sm text-grey50">
            + 지역선택
          </div>
        </div>
      </div>
    </div>
  )
}
