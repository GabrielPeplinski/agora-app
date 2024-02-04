import axios from 'axios';
import apiRoutes from '@/routes/Routes';

class AuthService {
  private fetchClient = axios;

  async register(data: any = {}): Promise<any> {
    return await this.fetchClient.post(apiRoutes.auth.register, data);
  }

  async login(data: any = {}): Promise<any> {
    try {
      const response = await this.fetchClient.post(apiRoutes.auth.login, data);
      return response.data;

    } catch (error) {
      console.log(error)
      throw error;
    }
  }
}

export default AuthService;