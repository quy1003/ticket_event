import { APIEndpoints } from '@/types/api.types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const API_ENDPOINTS: APIEndpoints = {
  USERS: {
    LIST: BASE_URL + '/users',
  },
}
