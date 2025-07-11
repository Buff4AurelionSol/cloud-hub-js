import axios from "axios";
import router from "@/router";
import Cookies from "js-cookie";
import { useSessionStore } from "@/stores/session";
import { useAppStore } from "@/stores/app";



const STATIC_TOKEN = "377841|RExCflV0dJX96GoQGcCaAdQDMX6IFCf8WmjQpOXS60979650"

 if (import.meta.env.DEV) {
  axios.defaults.baseURL = "http://10.0.0.77/api/cloudhub";
} else {
  axios.defaults.baseURL = "https://api.datalink.com.ve/api/cloudhub";
}



axios.interceptors.request.use(
  (config) => {
    //const session = useSessionStore();
    // const token = session.getToken;
    const token = STATIC_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const session = useSessionStore();
    const appStore = useAppStore();
    if (!error.response) {
      appStore.setServerDown(true);
    } else if (error.response.status === 401) {
      if (router.currentRoute.value.path !== "/") {
        Cookies.remove("CHauthToken", { path: "/" });
        session.setUser(null);
        session.setSessionExpired(true);
        await router.push({
          path: "/",
          query: { redirect: router.currentRoute.value.fullPath },
        });
      }
    }
    return Promise.reject(error);
  },
);
