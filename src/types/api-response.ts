export interface APIResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  meta?: {
    page?: number
    limit?: number
    totalItems?: number
    totalPages?: number
  }
}
