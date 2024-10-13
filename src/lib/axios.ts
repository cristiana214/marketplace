import type { AxiosRequestConfig } from "axios";
import Axios from "axios";

function authRequestInterceptor(config: AxiosRequestConfig) {
  // const token = 'some token';
  // if (token) {
  //   config?.headers?.authorization = `${token}`;
  // }
  // config?.headers?.Accept = 'application/json';
  return config;
}

// export const axios = Axios.create({
//   baseURL: process.env.NEXT_PUBLIC_APP_URL,
// });

export const axios = Axios.create();

// axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.log(message);

    return Promise.reject(error);
  },
);
