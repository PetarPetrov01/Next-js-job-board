"use client";

import { NextFont } from "next/dist/compiled/@next/font";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerUser } from "../lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthProvider";

const UserRegisterSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email" }),
    username: z
      .string()
      .trim()
      .min(1, { message: "Username is required" })
      .min(3, { message: "Username must be atleast 3 characters long" }),
    password: z
      .string()
      .trim()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be atleast 6 characters long" }),
    repassword: z
      .string()
      .trim()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be atleast 6 characters long" }),
  })
  .refine((data) => data.password == data.repassword, {
    message: "Passwords do not match",
    path: ["repassword"],
  });

type Inputs = z.infer<typeof UserRegisterSchema>;

export default function RegisterForm({ ptSerif }: { ptSerif: NextFont }) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const {setAuth} = useAuthContext();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<Inputs>({
    resolver: zodResolver(UserRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      repassword: "",
      username: "",
    },
  });

  const processSubmit = handleSubmit(async (data) => {
    const res = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      //Check the error from the res itself
      setError("root.apiError", { message: "Registration failed" });
    }

    const result = await res.json();
    setAuth(result);
    router.replace('/')
  });

  return (
    <form
      onSubmit={processSubmit}
      ref={formRef}
      className="register flex flex-col items-center justify-start gap-8  w-[80%] "
    >
      <div className={`heading pt-8 ${ptSerif.className}`}>
        <h1 className="text-3xl">Register your account</h1>
      </div>
      <div className="relative flex flex-col input-group w-[80%]">
        <input
          type="text"
          className="rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-pink"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <span className="absolute bottom-[-1.5em]">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="relative flex flex-col input-group w-[80%]">
        <input
          type="text"
          className="rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-pink"
          placeholder="Username"
          {...register("username")}
        />
        {errors.username && (
          <span className="absolute bottom-[-1.5em]">
            {errors.username.message}
          </span>
        )}
      </div>
      <div className="relative flex flex-col input-group w-[80%]">
        <input
          type="password"
          className="rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-pink"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <span className="absolute bottom-[-1.5em]">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="relative flex flex-col input-group w-[80%]">
        <input
          type="password"
          className="rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-pink focus:border-0"
          placeholder="Repeat password"
          {...register("repassword")}
        />
        {errors.repassword && (
          <span className="absolute bottom-[-1.5em]">
            {errors.repassword.message}
          </span>
        )}
      </div>
      <button className="relative flex flex-col w-[80%] py-1 text-xl rounded-md border-pink border-[1px] duration-150 bg-pink text-white after:content-[''] after:absolute after:bottom-[-1em] after:block after:h-[1px] after:bg-gray-200 after:w-[100%] hover:border-white">
        Register
      </button>
    </form>
  );
}
