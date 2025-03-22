import { useState, useMemo } from 'react'
import { jobCategoriesData } from '@/shared/data/roleSelectData'
import { projectTypeData } from '../data/ProjectTypeData'
import { workTypeData } from '../data/WorkTypeData'

export const usePositionSelect = (
  initialCategory = '',
  initialSubCategory = '',
  initialProjectType = '',
  initialWorkType = '',
) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedSubCategory, setSelectedSubCategory] = useState(initialSubCategory)
  const [selectedProjectType, setSelectedProjectType] = useState(initialProjectType)
  const [selectedWorkType, setSelectedWorkType] = useState(initialWorkType)

  const mainPositionOptions = useMemo(
    () =>
      jobCategoriesData.map((category) => ({
        label: category.name,
        value: category.name,
      })),
    [],
  )

  const subPositionOptions = useMemo(
    () =>
      jobCategoriesData
        .find((category) => category.name === selectedCategory)
        ?.subCategory.map((subCategory) => ({
          label: subCategory,
          value: subCategory,
        })) || [],
    [selectedCategory],
  )

  const projectTypeOptions = useMemo(
    () =>
      projectTypeData.map((category) => ({
        label: category.label,
        value: category.value,
      })),
    [],
  )

  const workTypeOptions = useMemo(
    () =>
      workTypeData.map((category) => ({
        label: category.label,
        value: category.value,
      })),
    [],
  )

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setSelectedSubCategory('') // 대분류가 변경되면 소분류 초기화
  }

  return {
    selectedCategory,
    selectedSubCategory,
    selectedProjectType,
    selectedWorkType,
    mainPositionOptions,
    subPositionOptions,
    projectTypeOptions,
    workTypeOptions,
    setSelectedCategory: handleCategoryChange,
    setSelectedSubCategory,
    setSelectedProjectType,
    setSelectedWorkType,
  }
}
