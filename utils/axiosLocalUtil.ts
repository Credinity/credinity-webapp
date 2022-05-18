import axios from "axios";

const pageApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
});

export default pageApi;
