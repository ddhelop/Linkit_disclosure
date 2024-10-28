import Image from 'next/image'
import Link from 'next/link'

export default function OnBoaridngHeader() {
  return (
    <>
      <nav className="flex h-auto w-full px-10 py-4">
        <Link href="/">
          <Image src="/common/icons/blue_logo_row.svg" alt="LinKit Logo" width={115} height={22} />
        </Link>
      </nav>
    </>
  )
}
