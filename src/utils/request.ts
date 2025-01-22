import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

interface RequestOptions {
  responseInterceptors?: (response: AxiosResponse) => AxiosResponse;
}

class Request {
  private instance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      (response) => {
        console.log(response);
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  post<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, config);
  }

  get<T>(url: string, config?: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.instance.get(url, { ...config, ...options });
  }

  put<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, { ...config });
  }
}

export const request = new Request({});
