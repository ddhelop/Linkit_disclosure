'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { getLicenses } from '@/features/profile/api/getLicenses'
import ElementComponent from './common/ElementComponent'
import Image from 'next/image'
import { deleteLicense } from '@/features/profile/api/licenseApi'
import { CertificationListSkeleton } from './skeletons/CertificationListSkeleton'
import { useToast } from '@/shared/hooks/useToast'

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
  const toast = useToast()

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
      toast.success('자격증이 삭제되었습니다.')
      // 목록 새로고침
      const data = await getLicenses()
      setLicenses(data)
    } catch (error) {
      console.error('Failed to delete license:', error)
      toast.alert('삭제에 실패했습니다.')
    }
  }

  return (
    <div className="flex flex-col">
      <Link href="/profile/edit/certifications/new">
        <Button
          mode="main"
          animationMode="main"
          className="flex w-full items-center justify-center gap-[0.68rem] rounded-lg bg-main2 px-5 py-2 text-sm font-semibold text-white"
        >
          추가하기
        </Button>
      </Link>

      {isLoading ? (
        <CertificationListSkeleton />
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          {licenses.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white py-16">
              <span className="text-grey60">아직 등록된 자격증이 없습니다.</span>
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
      )}
    </div>
  )
}
