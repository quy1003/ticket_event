import { API_ENDPOINTS } from '@/lib/api-endpoints'
import { httpClient } from '@/lib/httpClient'
import { ParamsList } from '@/types/params-list.types'
import { User } from '@/types/user.types'

export class UserService {
  static async getAllUsers(params?: ParamsList) {
    const res = await httpClient.get<User[]>(API_ENDPOINTS.USERS.LIST, { params })
    return { ...res, data: res.data ?? [] }
  }
}
