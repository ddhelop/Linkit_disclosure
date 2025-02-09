'use client'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { getProfileDetail } from '@/entities/profile/api/profileApi'
import { ProfileDetailData } from '@/entities/profile/model/types'
import ProfileViewSkills from '../ProfileViewSkills'
import ProfileViewHistory from '../ProfileViewHistory'
import ProfileViewPortFolio from '../ProfileViewPortFolio'
import ProfileViewEducation from '../ProfileViewEducation'
import ProfileViewAwards from '../ProfileViewAwards'
import ProfileViewLicense from '../ProfileViewLicense'
import ProfileViewLinks from '../ProfileViewLinks'
import { ProfileViewProvider } from '@/entities/profile/model/ProfileViewContext'
import ProfileViewLog from '../ProfileViewLog'
import NavigationRemote from './NavigationRemote'

export default function ProfileViewLayout() {
  const params = useParams()
  const [profileData, setProfileData] = useState<ProfileDetailData | null>(null)
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const [activeSection, setActiveSection] = useState('')

  const sections = [
    { id: 'log', label: '활동 로그' },
    { id: 'skills', label: '보유 스킬' },
    { id: 'history', label: '이력' },
    { id: 'portfolio', label: '포트폴리오' },
    { id: 'education', label: '학력' },
    { id: 'awards', label: '수상 내역' },
    { id: 'license', label: '자격증' },
    { id: 'links', label: '링크' },
  ]

  useEffect(() => {
    const getData = async () => {
      try {
        const emailId = params.emailId as string
        const data = await getProfileDetail(emailId)
        setProfileData(data)
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }
    getData()
  }, [params.emailId])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200 // 약간의 오프셋

      for (const section of sections) {
        const element = sectionsRef.current[section.id]
        if (!element) continue

        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = sectionsRef.current[sectionId]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!profileData) return <div>Loading...</div>

  return (
    <ProfileViewProvider profileData={profileData}>
      <div className="relative flex">
        <div className="flex flex-grow flex-col gap-6">
          <div ref={(el) => (sectionsRef.current['log'] = el)}>
            <ProfileViewLog />
          </div>
          <div ref={(el) => (sectionsRef.current['skills'] = el)}>
            <ProfileViewSkills />
          </div>
          <div ref={(el) => (sectionsRef.current['history'] = el)}>
            <ProfileViewHistory />
          </div>
          <div ref={(el) => (sectionsRef.current['portfolio'] = el)}>
            <ProfileViewPortFolio />
          </div>
          <div ref={(el) => (sectionsRef.current['education'] = el)}>
            <ProfileViewEducation />
          </div>
          <div ref={(el) => (sectionsRef.current['awards'] = el)}>
            <ProfileViewAwards />
          </div>
          <div ref={(el) => (sectionsRef.current['license'] = el)}>
            <ProfileViewLicense />
          </div>
          <div ref={(el) => (sectionsRef.current['links'] = el)}>
            <ProfileViewLinks />
          </div>
        </div>
        <NavigationRemote sections={sections} activeSection={activeSection} onSectionClick={scrollToSection} />
      </div>
    </ProfileViewProvider>
  )
}
