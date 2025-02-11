import { create } from 'zustand';
import axiosInstance from '@/utils/axios-instance';
import apiRoutes from '@/routes/routes';
import { errorToast, successToast } from '@/utils/use-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginInterface {
  email: string;
  password: string;
}

interface LoginResponse {
  tokenType: string;
  token: string;
  message: string;
}

type AuthState = {
  token: string | null
  setToken: (token: string | null) => void
  login: (credentials: LoginInterface) => void
  logout: () => void
  init: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => {
    set({ token: token });
  },
  login: async (credentials) => {
    try {
      const response = await axiosInstance().post<LoginResponse>(apiRoutes.auth.login, {
        email: credentials.email,
        password: credentials.password,
      });
      if (response.data.token) {
        set({ token: response.data.token });
        await AsyncStorage.setItem('token', response.data.token);
        successToast({ title: 'Sessão iniciada! Bem-vindo!' });
      } else {
        throw new Error('Token is not valid');
      }
    } catch (error: any) {
      errorToast({ title: 'Falha ao iniciar sessão. Tente novamente.' });
    }
  },
  logout: async () => {
    try {
      await axiosInstance().delete(apiRoutes.auth.logout);
      await AsyncStorage.removeItem('token');
      set({ token: null });
      successToast({ title: 'Sessão encerrada!' });
    } catch (error: any) {
      console.log(error);
      errorToast({ title: 'Falha ao encerrar sessão. Tente novamente.' });
    }
  },
  init: async () => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      set({ token: token });
    }
  },
}));