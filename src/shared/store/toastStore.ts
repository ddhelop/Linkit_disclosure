import { create } from 'zustand'

export interface ToastMessage {
  id: number
  message: string
  type: 'alert' | 'success' | 'default'
}

interface ToastStore {
  toastList: ToastMessage[]
  addToast: (toast: ToastMessage) => void
  removeToast: (id: number) => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toastList: [],
  addToast: (toast) => set((state) => ({ toastList: [...state.toastList, toast] })),
  removeToast: (id) => set((state) => ({ toastList: state.toastList.filter((toast) => toast.id !== id) })),
}))
