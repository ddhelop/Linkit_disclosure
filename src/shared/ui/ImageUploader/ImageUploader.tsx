import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'

interface ImageFile {
  id: number
  file: File
}

interface ImageUploaderProps {
  mainImage?: File | null
  mainImageUrl?: string | null
  subImages?: ImageFile[]
  subImageUrls?: string[]
  onMainImageUpload: (file: File) => void
  onMainImageDelete: () => void
  onSubImageUpload: (files: File[]) => void
  onSubImageDelete: (id: number) => void
  onSubImageUrlDelete: (index: number) => void
  mainImageTitle?: string
  subImageTitle?: string
  maxSubImages?: number
}

export function ImageUploader({
  mainImage,
  mainImageUrl,
  subImages = [],
  subImageUrls = [],
  onMainImageUpload,
  onMainImageDelete,
  onSubImageUpload,
  onSubImageDelete,
  onSubImageUrlDelete,
  mainImageTitle = '대표 이미지 (최대 1장)',
  subImageTitle = '프로젝트를 설명할 수 있는 보조 이미지가 있다면 추가해 주세요',
  maxSubImages = 4,
}: ImageUploaderProps) {
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onMainImageUpload(file)
    }
  }

  const handleSubImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      onSubImageUpload(files)
    }
  }

  const handleMainImageClick = () => {
    const fileInput = document.querySelector<HTMLInputElement>('input[type="file"].main-image')
    fileInput?.click()
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="flex w-[10.6rem]">이미지</span>
      <span className="mt-3 text-sm text-grey60">{mainImageTitle}</span>

      <div className="flex items-end gap-6">
        {/* 대표 이미지 */}
        {mainImage ? (
          <div className="relative h-[120px] w-[120px] rounded-lg">
            <Image src={URL.createObjectURL(mainImage)} fill alt="대표 이미지" className="rounded-lg object-cover" />
          </div>
        ) : mainImageUrl ? (
          <div className="relative h-[120px] w-[120px] rounded-lg">
            <Image src={mainImageUrl} fill alt="대표 이미지" className="rounded-lg object-cover" />
          </div>
        ) : (
          <div className="relative flex h-[120px] w-[120px] items-center justify-center rounded-lg bg-grey10">
            <Image src="/common/default_profile.svg" fill alt="이미지 업로드" className="object-contain" />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <span className="text-xs text-grey50">10MB 이하 PNG, JPG 파일을 업로드해 주세요</span>
          <div className="flex items-center gap-4">
            <input
              type="file"
              className="main-image hidden"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleMainImageChange}
            />
            <Button mode="main" animationMode="main" className="rounded-xl text-xs" onClick={handleMainImageClick}>
              사진 업로드
            </Button>
            {mainImage && (
              <button onClick={onMainImageDelete} className="cursor-pointer text-xs text-grey50 underline">
                삭제하기
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 부가 이미지 */}
      <div className="mt-6 flex flex-col">
        <span className="text-sm text-grey60">
          {subImageTitle} (최대 {maxSubImages}장)
        </span>

        <div className="mt-2 flex flex-wrap gap-2">
          {/* 새로 로드된 이미지 */}
          {subImages.map((image) => (
            <div key={image.id} className="group relative rounded-lg">
              <div className="relative h-[86px] w-[156px]">
                <Image
                  src={URL.createObjectURL(image.file)}
                  fill
                  alt="보조 이미지"
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100" />
              <div
                className="absolute right-2 top-2 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => onSubImageDelete(image.id)}
              >
                <span className="cursor-pointer text-sm text-white underline">삭제하기</span>
              </div>
            </div>
          ))}

          {/* 기존 서브 이미지 */}
          {subImageUrls.map((url, index) => (
            <div key={`url-${index}`} className="relative">
              <Image src={url} width={156} height={86} alt="보조 이미지" className="h-[86px] w-[146px] object-cover" />
              <button
                onClick={() => onSubImageUrlDelete(index)}
                className="absolute -right-2 -top-2 rounded-full bg-grey50 p-1 hover:scale-110"
              >
                <Image src="/common/icons/delete_x.svg" width={15} height={15} alt="삭제" />
              </button>
            </div>
          ))}

          {/* 이미지 추가 버튼 */}
          {subImages.length + subImageUrls.length < maxSubImages && (
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/jpg"
                multiple
                onChange={handleSubImageChange}
              />
              <div className="flex h-[5.4rem] w-[9.75rem] items-center justify-center rounded-lg bg-grey30 hover:bg-grey40">
                <Image src="/common/icons/black_plus.svg" width={15} height={15} alt="plus-icon" />
              </div>
            </label>
          )}
        </div>
      </div>
    </div>
  )
}
