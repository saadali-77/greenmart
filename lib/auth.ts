import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyToken } from "./jwt";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = await verifyToken(token);

    return payload;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/");
  }

  return user;
}