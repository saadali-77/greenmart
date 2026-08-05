"use server";

import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/password";
import { createToken } from "@/lib/jwt";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function loginUser(
  state: {
    error?: string;
  },
  formData: FormData
) {


  const email = formData.get("email") as string;
  const password = formData.get("password") as string;



  if (!email || !password) {

    return {
      error: "Email and password are required"
    };

  }



  const user = await prisma.user.findUnique({

    where: {
      email
    }

  });



  if (!user) {

    return {
      error: "Invalid email or password"
    };

  }



  const passwordMatch = await comparePassword(
    password,
    user.password
  );



  if (!passwordMatch) {

    return {
      error: "Invalid email or password"
    };

  }



  const token = await createToken({

    id: user.id,

    email: user.email,

    role: user.role

  });



  const cookieStore = await cookies();


  cookieStore.set(
    "session",
    token,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7
    }
  );



  redirect("/");

}