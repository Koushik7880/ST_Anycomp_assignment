// client/src/lib/api.ts
import axios from "axios";

export const api = axios.create({
  // 🔹 In production this comes from Vercel env
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000",
});
