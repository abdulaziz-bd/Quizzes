import { api } from "../../api";
import { logout, refreshToken } from "../features/auth/authSlice";

export const setupAuthInterceptors = (store) => {
  api.interceptors.request.use(
    (config) => {
      const accessToken = store.getState().auth.accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          await store.dispatch(refreshToken());

          const newToken = store.getState().auth.accessToken;

          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          store.dispatch(logout());

          sessionStorage.setItem(
            "redirectAfterLogin",
            window.location.pathname
          );

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
