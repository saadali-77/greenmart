"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { useState } from "react";

import {
  registerUser,
  RegisterState
} from "./Action";



const initialState: RegisterState = {};



export default function RegisterPage() {


  const [state, formAction, pending] =
    useActionState(
      registerUser,
      initialState
    );


  const [showPassword,setShowPassword] =
    useState(false);

  const [showConfirm,setShowConfirm] =
    useState(false);




  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-green-50
      via-white
      to-emerald-100
      px-4
    ">


      <div className="w-full max-w-md">



        {/* Logo */}

        <div className="text-center mb-8">

          <div className="
            mx-auto
            w-16
            h-16
            rounded-2xl
            bg-green-600
            flex
            items-center
            justify-center
            shadow-lg
          ">

            <Leaf className="text-white w-8 h-8"/>

          </div>


          <h1 className="
            mt-4
            text-3xl
            font-bold
            text-gray-800
          ">

            Green
            <span className="text-green-600">
              Mart
            </span>

          </h1>


          <p className="text-gray-500 mt-2">
            Create your account and start shopping
          </p>

        </div>




        {/* Card */}

        <div className="
          bg-white/80
          backdrop-blur-xl
          shadow-xl
          rounded-3xl
          p-8
          border
          border-green-100
        ">



          <h2 className="
            text-2xl
            font-semibold
            text-gray-800
            mb-6
          ">
            Register
          </h2>




          <form
            action={formAction}
            className="space-y-5"
          >



            {/* Name */}

            <div>

              <label className="text-sm font-medium">
                Full Name
              </label>


              <input
                name="name"
                type="text"
                placeholder="Saad Ali"
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-green-200
                "
              />


              {
                state.errors?.name &&
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.name}
                </p>
              }

            </div>





            {/* Email */}

            <div>

              <label className="text-sm font-medium">
                Email
              </label>


              <input
                name="email"
                type="email"
                placeholder="saad@gmail.com"
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-green-200
                "
              />


              {
                state.errors?.email &&
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.email}
                </p>
              }

            </div>






            {/* Password */}

            <div>

              <label className="text-sm font-medium">
                Password
              </label>


              <div className="relative">


                <input
                  name="password"
                  type={
                    showPassword
                    ? "text"
                    : "password"
                  }
                  placeholder="******"
                  className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    px-4
                    py-3
                    pr-12
                  "
                />



                <button
                  type="button"
                  onClick={()=>setShowPassword(!showPassword)}
                  className="
                    absolute
                    right-4
                    top-5
                  "
                >

                  {
                    showPassword
                    ?
                    <EyeOff size={20}/>
                    :
                    <Eye size={20}/>
                  }

                </button>


              </div>


              {
                state.errors?.password &&
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.password}
                </p>
              }

            </div>







            {/* Confirm Password */}

            <div>

              <label className="text-sm font-medium">
                Confirm Password
              </label>


              <div className="relative">


                <input
                  name="confirmPassword"
                  type={
                    showConfirm
                    ? "text"
                    : "password"
                  }
                  placeholder="******"
                  className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    px-4
                    py-3
                    pr-12
                  "
                />



                <button
                  type="button"
                  onClick={()=>setShowConfirm(!showConfirm)}
                  className="
                    absolute
                    right-4
                    top-5
                  "
                >

                  {
                    showConfirm
                    ?
                    <EyeOff size={20}/>
                    :
                    <Eye size={20}/>
                  }

                </button>


              </div>



              {
                state.errors?.confirmPassword &&
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.confirmPassword}
                </p>
              }


            </div>





            <button
              disabled={pending}
              className="
                w-full
                bg-green-600
                hover:bg-green-700
                disabled:bg-gray-400
                text-white
                font-semibold
                py-3
                rounded-xl
              "
            >

              {
                pending
                ?
                "Creating Account..."
                :
                "Create Account"
              }

            </button>



          </form>





          <p className="text-center text-sm text-gray-500 mt-6">

            Already have an account?

            <Link
              href="/login"
              className="
                ml-1
                text-green-600
                font-semibold
              "
            >
              Login
            </Link>

          </p>



        </div>


      </div>


    </div>

  );
}