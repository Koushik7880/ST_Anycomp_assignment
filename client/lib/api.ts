// src/lib/api.ts
import axios from "axios";
import { API_BASE_URL } from "@/config/constants";

// remove any trailing slash just in case
const normalizedBase = API_BASE_URL.replace(/\/+$/, "");

export const api = axios.create({
  baseURL: `${normalizedBase}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
