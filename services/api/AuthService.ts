import axios from 'axios';
import environments from '@/config/environments';

class AuthService {
  private readonly baseApiUrl: string;
  private fetchClient: any;

  constructor() {
    this.baseApiUrl = environments.baseApiUrl;
    this.fetchClient = axios.create({
      baseURL: this.baseApiUrl,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  }

  async register(data: any = {}): Promise<any> {
    try {
      const response = await this.fetchClient.post('auth/register', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw error;
    }
  }

  async login(data: any = {}): Promise<any> {
    try {
      const response = await this.fetchClient.post('login', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }
}

export default AuthService;
