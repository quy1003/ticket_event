import { APIResponse } from '@/types/api-response'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

const API_CONFIG = {
  baseUrl: BASE_URL,
  timeout: 15000,
}

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_CONFIG.baseUrl,
    timeout: API_CONFIG.timeout,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  instance.interceptors.request.use(
    (config) => {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      })
      return config
    },
    (error) => {
      console.error('[API] ❌ Request Error:', error)
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response) {
        console.error(
          `[API] ❌ ${error.response.status} ${error.config?.url}:`,
          error.response.data
        )
      } else {
        console.error('[API] ❌ Network / Timeout Error:', error.message)
      }
      return Promise.reject(error)
    }
  )

  return instance
}

export class HTTPClient {
  private instance: AxiosInstance

  constructor() {
    this.instance = createAxiosInstance()
  }

  private async request<T = any>(
    url: string,
    options: AxiosRequestConfig
  ): Promise<APIResponse<T>> {
    try {
      const { data } = await this.instance.request<T>(options)
      return {
        success: true,
        data,
      }
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

  public get<T = any>(url: string, params?: Record<string, any>) {
    return this.request<T>(url, { method: 'GET', url, params })
  }

  public post<T = any>(url: string, data?: Record<string, any>) {
    return this.request<T>(url, { method: 'POST', url, data })
  }

  public put<T = any>(url: string, data?: Record<string, any>) {
    return this.request<T>(url, { method: 'PUT', url, data })
  }

  public patch<T = any>(url: string, data?: Record<string, any>) {
    return this.request<T>(url, { method: 'PATCH', url, data })
  }

  public delete<T = any>(url: string, params?: Record<string, any>) {
    return this.request<T>(url, { method: 'DELETE', url, params })
  }

  public uploadFile<T = any>(url: string, file: File, extra?: Record<string, any>) {
    const formData = new FormData()
    formData.append('file', file)
    if (extra) {
      Object.entries(extra).forEach(([key, value]) => formData.append(key, value as any))
    }

    return this.request<T>(url, {
      method: 'POST',
      url,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }
}

export const httpClient = new HTTPClient()
