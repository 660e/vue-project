import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export interface AppRequestConfig {
  requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  responseInterceptors?: (response: AxiosResponse) => AxiosResponse;
}
