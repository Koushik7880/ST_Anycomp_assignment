// app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // Always redirect root to the specialists list
  redirect("/specialists");
}
