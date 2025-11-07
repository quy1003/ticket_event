import { APIResponse } from '@/types/api-response'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export class HTTPClient {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
      timeout: 15000,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  private async request<T = any>(
    url: string,
    options: AxiosRequestConfig
  ): Promise<APIResponse<T>> {
    try {
      const { data } = await this.instance.request<APIResponse<T>>({
        url,
        ...options,
      })

      return data
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || 'Unexpected error occurred'

      return {
        success: false,
        message,
        data: error?.response?.data,
      }
    }
  }

  // === GET ===
  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>(url, { ...config, method: 'GET' })
  }

  // === POST ===
  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<T>> {
    return this.request<T>(url, { ...config, method: 'POST', data })
  }

  // === PUT ===
  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<T>> {
    return this.request<T>(url, { ...config, method: 'PUT', data })
  }

  // === DELETE ===
  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>(url, { ...config, method: 'DELETE' })
  }
}

export const httpClient = new HTTPClient()
