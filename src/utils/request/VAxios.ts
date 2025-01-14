import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

export class VAxios {
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
}
