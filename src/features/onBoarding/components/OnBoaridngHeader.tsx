import Image from 'next/image'

export default function OnBoaridngHeader() {
  return (
    <>
      <nav className="flex h-auto w-full px-10 py-6">
        <Image src="/common/icons/blue_logo_row.svg" alt="LinKit Logo" width={115} height={22} />
      </nav>
    </>
  )
}
