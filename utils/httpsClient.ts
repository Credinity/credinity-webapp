import axios from "axios";

const httpsClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
});

export default httpsClient;
