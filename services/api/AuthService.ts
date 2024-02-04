import axios from 'axios';
import apiRoutes from '@/routes/Routes';
import environments from '@/config/environments';

class AuthService {
  private fetchClient = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  private baseUrl : string = environments.baseUrl;

  async register(data: any = {}): Promise<any> {
    return await this.fetchClient.post(this.baseUrl + apiRoutes.auth.register, data);
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