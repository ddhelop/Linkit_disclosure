'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { getLicenses } from '@/features/profile/api/getLicenses'
import ElementComponent from './common/ElementComponent'

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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (licenses.length === 0) {
    return (
      <div className="flex flex-col rounded-xl bg-white px-[1.62rem] pb-7 pt-[1.87rem]">
        <Link href={'/profile/edit/certifications/new'} className="w-full">
          <Button mode="main2" animationMode="main" className="w-full">
            자격증 추가하기
          </Button>
        </Link>
        <div className="mt-4 text-grey60">자격증 내역이 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col rounded-xl bg-white px-[1.62rem] pb-7 pt-[1.87rem]">
      <Link href={'/profile/edit/certifications/new'} className="w-full">
        <Button mode="main2" animationMode="main" className="w-full">
          자격증 추가하기
        </Button>
      </Link>

      <div className="mt-4">
        {licenses.map((license) => (
          <ElementComponent
            key={license.profileLicenseId}
            id={license.profileLicenseId}
            title={license.licenseName}
            subtitle={license.licenseInstitution}
            date={license.licenseAcquisitionDate}
            editPath="/profile/edit/certifications/new"
          />
        ))}
      </div>
    </div>
  )
}
