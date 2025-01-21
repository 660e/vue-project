import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

class Request {
  private readonly config;
  private instance;

  constructor(config: AxiosRequestConfig) {
    this.config = config;
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
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  post<T>(url: string): Promise<T> {
    return this.instance.post(url);
  }

  get<T>(url: string): Promise<T> {
    return this.instance.get(url);
  }

  put<T>(url: string): Promise<T> {
    return this.instance.put(url);
  }

  delete<T>(url: string): Promise<T> {
    return this.instance.delete(url);
  }
}

export const request = new Request({});
