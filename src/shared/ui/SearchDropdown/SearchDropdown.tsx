import Image from 'next/image'
import { useSearchDropdown } from '@/shared/hooks/useSearchDropdown'

interface SearchDropdownProps<T> {
  items: T[]
  filterFunction: (item: T, searchTerm: string) => boolean
  onSelect: (item: T) => void
  placeholder?: string
  renderItem?: (item: T, isSelected: boolean) => React.ReactNode
  className?: string
  getItemLogo?: (item: T) => string
}

export function SearchDropdown<T>({
  items,
  filterFunction,
  onSelect,
  placeholder = '',
  renderItem,
  className = '',
  getItemLogo,
}: SearchDropdownProps<T>) {
  const { searchTerm, setSearchTerm, showResults, setShowResults, focusedIndex, filteredItems, handleKeyDown } =
    useSearchDropdown({ items, filterFunction })

  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          setShowResults(true)
        }}
        onFocus={() => setShowResults(true)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-grey40 bg-white px-6 py-4 placeholder-grey40 focus:outline-none focus:ring-2 focus:ring-main"
        onKeyDown={(e) => handleKeyDown(e, onSelect)}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <Image src={'/common/icons/search.svg'} alt="search" width={24} height={24} />
      </div>

      {showResults && searchTerm && (
        <div className="absolute z-10 mt-2 max-h-[300px] w-full overflow-y-auto rounded-xl border border-grey40 bg-white shadow-lg">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={index}
                className={`flex cursor-pointer items-center gap-2 px-6 py-3 ${
                  focusedIndex === index ? 'bg-gray-100' : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  onSelect(item)
                  setSearchTerm('')
                  setShowResults(false)
                }}
              >
                {getItemLogo && (
                  <Image src={getItemLogo(item)} alt="logo" width={24} height={24} className="h-6 w-6 rounded-lg" />
                )}
                {renderItem ? renderItem(item, focusedIndex === index) : String(item)}
              </div>
            ))
          ) : (
            <div className="px-6 py-3 text-grey40">검색 결과가 없습니다</div>
          )}
        </div>
      )}
    </div>
  )
}
