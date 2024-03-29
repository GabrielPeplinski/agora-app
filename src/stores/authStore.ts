import create from 'zustand';

type CurrentUser = {
  id: number
  name: string
}

type AuthState = {
  user: CurrentUser | null
  token: string | null
  setUser: (user: CurrentUser | null) => void
  setToken: (token: string | null) => void
  login: (user: CurrentUser, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));