import { useState } from 'react'

interface UseSearchDropdownProps<T> {
  items: T[]
  filterFunction: (item: T, searchTerm: string) => boolean
}

export const useSearchDropdown = <T>({ items, filterFunction }: UseSearchDropdownProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const filteredItems = searchTerm ? items.filter((item) => filterFunction(item, searchTerm)) : []

  const handleKeyDown = (e: React.KeyboardEvent, onSelect: (item: T) => void) => {
    if (!showResults || !searchTerm) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : prev))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        break
      case 'Enter':
        e.preventDefault()
        if (focusedIndex >= 0 && filteredItems[focusedIndex]) {
          onSelect(filteredItems[focusedIndex])
          setFocusedIndex(-1)
          setSearchTerm('')
          setShowResults(false)
        }
        break
      case 'Escape':
        setShowResults(false)
        setFocusedIndex(-1)
        break
    }
  }

  return {
    searchTerm,
    setSearchTerm,
    showResults,
    setShowResults,
    focusedIndex,
    filteredItems,
    handleKeyDown,
  }
}
