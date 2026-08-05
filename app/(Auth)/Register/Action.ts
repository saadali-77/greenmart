"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { redirect } from "next/navigation";


export type RegisterState = {
  errors?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
};



export async function registerUser(
  previousState: RegisterState,
  formData: FormData
): Promise<RegisterState> {


  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword =
    formData.get("confirmPassword") as string;



  const errors: RegisterState["errors"] = {};



  // Name validation

  if (!name?.trim()) {
    errors.name = "Name is required";
  }



  // Email validation

  if (!email?.trim()) {

    errors.email = "Email is required";

  } 
  else if (!email.includes("@")) {

    errors.email = "Enter a valid email";

  }



  // Password validation

  if (!password) {

    errors.password = "Password is required";

  } 
  else if (password.length < 6) {

    errors.password =
      "Password must be at least 6 characters";

  }



  // Confirm password

  if (!confirmPassword) {

    errors.confirmPassword =
      "Please confirm your password";

  }
  else if(password !== confirmPassword){

    errors.confirmPassword =
      "Passwords do not match";

  }



  if(Object.keys(errors).length > 0){

    return {
      errors
    };

  }



  // Existing email check

  const existingUser = await prisma.user.findUnique({

    where:{
      email
    }

  });



  if(existingUser){

    return {

      errors:{
        email:"Email already registered"
      }

    };

  }



  // Hash password

  const hashedPassword =
    await hashPassword(password);



  // Create user

  await prisma.user.create({

    data:{
      name,
      email,
      password: hashedPassword
    }

  });



  redirect("/login");

}