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
  mainImageTitle = '대표 이미지 1장',
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
          <Image
            src={URL.createObjectURL(mainImage)}
            width={204}
            height={115}
            alt="대표 이미지"
            className="h-[115px] w-[204px] rounded-lg object-cover"
          />
        ) : mainImageUrl ? (
          <Image
            src={mainImageUrl}
            width={204}
            height={115}
            alt="대표 이미지"
            className="h-[115px] w-[204px] rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-[115px] w-[204px] items-center justify-center rounded-lg bg-grey10">
            <Image
              src="/common/images/no_thumbnail.svg"
              width={204}
              height={115}
              alt="이미지 업로드"
              className="h-[115px] w-[204px] object-contain"
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <span className="text-xs text-grey50">*10MB 하의 PNG, JPG 파일 업로드 해주세요</span>
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
            <div key={image.id} className="relative">
              <Image
                src={URL.createObjectURL(image.file)}
                width={156}
                height={86}
                alt="보조 이미지"
                className="h-[86px] w-[156px] object-cover"
              />
              <button
                onClick={() => onSubImageDelete(image.id)}
                className="absolute -right-2 -top-2 rounded-full bg-grey50 p-1"
              >
                <Image src="/common/icons/close.svg" width={12} height={12} alt="삭제" />
              </button>
            </div>
          ))}

          {/* 기존 서브 이미지 */}
          {subImageUrls.map((url, index) => (
            <div key={`url-${index}`} className="relative">
              <Image src={url} width={156} height={86} alt="보조 이미지" className="h-[86px] w-[156px] object-cover" />
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
