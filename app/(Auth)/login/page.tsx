"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Eye, EyeOff, Leaf } from "lucide-react";

import { loginUser } from "./Action";


const initialState = {
  error: "",
};


export default function LoginPage() {


  const [state, formAction, pending] = useActionState(
    loginUser,
    initialState
  );


  const [showPassword, setShowPassword] = useState(false);



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
            Welcome back! Login to continue shopping
          </p>


        </div>






        {/* Card */}

        <form
          action={formAction}
          className="
            bg-white/80
            backdrop-blur-xl
            shadow-xl
            rounded-3xl
            p-8
            border
            border-green-100
          "
        >




          <h2 className="
            text-2xl
            font-semibold
            text-gray-800
            mb-6
          ">

            Login

          </h2>






          {
            state.error && (

              <p className="
                text-red-500
                text-sm
                mb-4
                font-medium
                text-center
              ">

                {state.error}

              </p>

            )
          }






          {/* Email */}

          <div className="mb-5">


            <label className="
              text-sm
              font-medium
              text-gray-700
            ">

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
                border-gray-200
                px-4
                py-3
                outline-none
                focus:border-green-500
                focus:ring-2
                focus:ring-green-200
                transition
              "

            />



          </div>







          {/* Password */}

          <div className="mb-6">


            <label className="
              text-sm
              font-medium
              text-gray-700
            ">

              Password

            </label>



            <div className="relative mt-2">


              <input

                name="password"

                type={
                  showPassword
                  ? "text"
                  : "password"
                }

                placeholder="********"

                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  pr-12
                  outline-none
                  focus:border-green-500
                  focus:ring-2
                  focus:ring-green-200
                  transition
                "

              />




              <button

                type="button"

                onClick={() =>
                  setShowPassword(!showPassword)
                }

                className="
                  absolute
                  right-4
                  top-3.5
                  text-gray-500
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



          </div>







          {/* Button */}

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
              shadow-md
              transition
            "

          >

            {
              pending
              ?
              "Logging in..."
              :
              "Login"
            }


          </button>







          <p className="
            text-center
            text-sm
            text-gray-500
            mt-6
          ">


            Don't have an account?


            <Link

              href="/Register"

              className="
                ml-1
                text-green-600
                font-semibold
                hover:underline
              "

            >

              Register

            </Link>


          </p>




        </form>


      </div>


    </div>

  );
}