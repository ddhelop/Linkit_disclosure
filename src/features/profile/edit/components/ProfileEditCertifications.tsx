'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { getLicenses } from '@/features/profile/api/getLicenses'
import ElementComponent from './common/ElementComponent'
import Image from 'next/image'
import { deleteLicense } from '@/features/profile/api/licenseApi'

interface License {
  profileLicenseId: number
  licenseName: string
  licenseInstitution: string
  licenseAcquisitionDate: string
  isLicenseVerified: boolean
}

export default function ProfileEditCertifications() {
  const [licenses, setLicenses] = useState<License[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const data = await getLicenses()
        setLicenses(data)
      } catch (error) {
        console.error('Failed to fetch licenses:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLicenses()
  }, [])

  const handleDelete = async (id: number) => {
    const isConfirmed = confirm('정말 삭제하시겠습니까?')
    if (!isConfirmed) return

    try {
      await deleteLicense(id)
      alert('자격증이 삭제되었습니다.')
      // 목록 새로고침
      const data = await getLicenses()
      setLicenses(data)
    } catch (error) {
      console.error('Failed to delete license:', error)
      alert('삭제에 실패했습니다.')
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col">
      <Link href={'/profile/edit/certifications/new'} className="w-full">
        <Button mode="main2" animationMode="main" className="w-full rounded-[0.69rem] py-2">
          + 추가하기
        </Button>
      </Link>

      <div className="mt-4 flex flex-col gap-4">
        {licenses.length === 0 ? (
          <div className="mt-5 flex w-full justify-center">
            <Image
              src={'/common/images/not-contents-ui.png'}
              alt="empty"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full"
              priority
            />
          </div>
        ) : (
          licenses.map((license) => (
            <ElementComponent
              key={license.profileLicenseId}
              id={license.profileLicenseId}
              title={license.licenseName}
              subtitle={license.licenseInstitution}
              date={license.licenseAcquisitionDate}
              editPath="/profile/edit/certifications/new"
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}
