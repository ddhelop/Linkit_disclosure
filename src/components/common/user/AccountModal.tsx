import { useState } from 'react'
import UserOption from './UserOption'
import ConfirmModal from './ConfirmModal'

interface AccountModalProps {
  onClose: () => void
}

export default function AccountModal({ onClose }: AccountModalProps) {
  const [showUserOption, setShowUserOption] = useState(true)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [userName, setUserName] = useState('')

  const handleCloseUserOption = () => {
    setShowUserOption(false)
    onClose()
  }

  const handleShowConfirmModal = (name: string) => {
    setUserName(name)
    setShowUserOption(false)
    setShowConfirmModal(true)
  }

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false)
    onClose()
  }

  return (
    <>
      <div className="">
        {showUserOption && <UserOption onClose={handleCloseUserOption} onShowConfirmModal={handleShowConfirmModal} />}
        {showConfirmModal && <ConfirmModal onClose={handleCloseConfirmModal} userName={userName} />}
      </div>
    </>
  )
}
