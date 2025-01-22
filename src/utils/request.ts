import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

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
        const { responseInterceptors } = response.config as InternalAxiosRequestConfig & RequestOptions;
        if (responseInterceptors) {
          return responseInterceptors(response);
        } else {
          return response.data;
        }
      },
      (error) => {
        const { response } = error;
        if (response) {
          switch (response.status) {
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
              break;
          }
        }
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

export const request = new Request({
  timeout: 10000,
});
