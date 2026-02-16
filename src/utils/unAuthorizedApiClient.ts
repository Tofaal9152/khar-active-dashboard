import axios from "axios";

import { env } from "@/config/env.client";

const unAuthorizedApiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
  // withCredentials: true,
});

export default unAuthorizedApiClient;
