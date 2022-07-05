import axios from "axios";

const axiosLocal = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
});

export default axiosLocal;
