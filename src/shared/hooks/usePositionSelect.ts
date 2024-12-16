import { useState, useMemo } from 'react'
import { jobCategoriesData } from '@/shared/data/roleSelectData'

interface PositionOption {
  label: string
  value: string
}

export const usePositionSelect = (initialCategory = '', initialSubCategory = '') => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedSubCategory, setSelectedSubCategory] = useState(initialSubCategory)

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

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setSelectedSubCategory('') // 대분류가 변경되면 소분류 초기화
  }

  return {
    selectedCategory,
    selectedSubCategory,
    mainPositionOptions,
    subPositionOptions,
    setSelectedCategory: handleCategoryChange,
    setSelectedSubCategory,
  }
}
