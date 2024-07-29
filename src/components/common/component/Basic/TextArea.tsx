import { forwardRef } from 'react'

interface TextareaProps {
  label?: string
  name: string
  placeholder?: string
  required?: boolean
  className?: string
  [x: string]: any
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, name, placeholder, required, className, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={name} className="text-sm font-normal text-grey100">
            {label}
            {required && <span className="pl-1 text-[#2563EB]">*</span>}
          </label>
        )}
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          ref={ref}
          className={`mt-2 resize-none rounded-[0.31rem] border border-grey40 px-[0.88rem] py-3 text-sm outline-none hover:ring hover:ring-grey30 ${className}`}
          {...rest}
        />
      </div>
    )
  },
)

Textarea.displayName = 'TextareaComponent'

export default Textarea
