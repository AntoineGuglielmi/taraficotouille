// stores/UsePermission.ts
import { create } from 'zustand'

type UsePermission = {
  userType: string | null
  setUserType: (type: string) => void
}

export const usePermission = create<UsePermission>((set) => ({
  userType: null,
  setUserType: (type: string) => set({ userType: type }),
}))
