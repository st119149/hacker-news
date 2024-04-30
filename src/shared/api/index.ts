import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const API_URL = "https://hacker-news.firebaseio.com";

class ApiInstance {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
    });
  }

  async get<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.get(endpoint, options);
    return response.data;
  }
}

export const apiInstance = new ApiInstance();
