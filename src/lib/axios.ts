import axios, { type AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const rawAxios = axios.create({
  baseURL: "/",
  withCredentials: true,
});

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

export let isRefreshing = false;
let failedQueue: {
  resolve: (value: string | PromiseLike<string>) => void;
  reject: (reason?: Error) => void;
}[] = [];

const processQueue = (error: Error, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });
  failedQueue = [];
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;
    const isOnLoginPage =
      window.location.pathname === "/login" ||
      window.location.pathname === "/register";

    const shouldRefresh =
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      !isOnLoginPage;

    if (!shouldRefresh) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => resolve(instance(originalRequest)),
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      console.log("Refreshing token");
      await rawAxios.get("/api/auth/refresh");
      processQueue(new Error("Token refreshed"), null);
      return instance(originalRequest);
    } catch (err) {
      console.log("hello from catch");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const status = (err as any)?.response?.status;
      if (status === 401 || status === 403) {
        console.warn("Redirecting to login after refresh failure");
        // window.location.reload();
        return Promise.resolve({ data: { user: null } });
      }
      return Promise.resolve({ data: { user: null } });
    } finally {
      console.log("hello from finally");
      isRefreshing = false;
    }
  }
);

export default instance;
