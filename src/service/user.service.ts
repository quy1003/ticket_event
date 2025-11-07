import { API_ENDPOINTS } from '@/lib/api-endpoints'
import { httpClient } from '@/lib/httpClient'

export class UserService {
  static async getAllUsers() {
    const users = await httpClient.get(API_ENDPOINTS.USERS.LIST)
    return users
  }
}
