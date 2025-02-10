import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

interface RequestOptions {
  requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  responseInterceptors?: (response: AxiosResponse) => AxiosResponse;
}

class Request {
  private instance;
  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const { requestInterceptors } = config as InternalAxiosRequestConfig & RequestOptions;
        if (requestInterceptors) {
          return requestInterceptors(config);
        } else {
          config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
          return config;
        }
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { responseInterceptors } = response.config as InternalAxiosRequestConfig & RequestOptions;
        if (responseInterceptors) {
          return responseInterceptors(response);
        } else {
          return response.data;
        }
      },
      (error) => {
        switch (error.response.status) {
          case 401:
            console.log('401');
            break;
          case 404:
            console.log('404');
            break;
          case 500:
            console.log('500');
            break;
          default:
            console.log('default');
        }
        return Promise.reject(error);
      },
    );
  }

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.setupInterceptors();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, config);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<T = any>(url: string, config?: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.instance.get(url, { ...config, ...options });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, config);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, { ...config });
  }
}

export const request = new Request({
  timeout: 10000,
});
