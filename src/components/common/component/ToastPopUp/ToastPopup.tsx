import { toast, ToastOptions, ToastContent } from 'react-toastify'
import { ReactNode } from 'react'
import Image from 'next/image'

// Define type for toast notification type
type ToastType = 'error' | 'warning' | 'success'

// Define type for optional icon component
type IconComponent = ReactNode | null

// Function to get custom icon based on toast type
const getIcon = (type: ToastType): IconComponent => {
  switch (type) {
    case 'success':
      return (
        <span className="mr-4">
          <Image src={'/assets/icons/check.svg'} alt="check" width={25} height={25} />
        </span>
      )
    case 'error':
      return <span className="mr-2">❌</span>
    case 'warning':
      return <span className="mr-2">⚠️</span>
    default:
      return null
  }
}

// Define contextClass for different notification types
export const contextClass = {
  success: 'bg-white text-white ',
  error: 'bg-red-600 text-white ',
  warning: 'bg-orange-400 text-white border border-orange-600',
  info: 'bg-gray-600 text-white',
  default: 'bg-indigo-600 text-white',
  dark: 'bg-black text-white',
}

// Function to push notification with custom styles and icons
export const pushNotification = (msg: string, type: ToastType) => {
  const options: ToastOptions = {
    position: 'top-center',
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    pauseOnHover: false,
    closeButton: false,
    // Add custom class name based on type
    className: `${contextClass[type]} p-3 rounded-md shadow-lg flex items-center`,
    // Add body class for consistent styling
    bodyClassName: 'text-sm font-medium',
  }

  // Define toast content with optional icon
  const content: ToastContent = (
    <div className="flex items-center">
      {getIcon(type)}
      <span>{msg}</span>
    </div>
  )

  // Trigger toast notification
  toast(content, options)
}
