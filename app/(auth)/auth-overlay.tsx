"use client";

import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { useGeneralStore } from "@/store/general";
import Register from "./register";
import Login from "./login";

export default function AuthOverlay() {
  const { setIsLoginOpen } = useGeneralStore();

  let [isRegister, setIsRegister] = useState<boolean>(false);

  return (
    <div
      id="AuthOverlay"
      className="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative bg-white w-full max-w-[470px] h-[70%] p-4 rounded-lg">
        <div className="w-full flex justify-end">
          <button
            onClick={() => setIsLoginOpen(false)}
            className="p-1.5 rounded-full bg-lime-500 hover:bg-lime-600"
          >
            <AiOutlineClose size="20" />
          </button>
        </div>

        {isRegister ? <Register /> : <Login />}

        <div className="absolute flex items-center justify-center py-5 left-0 bottom-0 border-t w-full">
          <span className="text-[14px] text-gray-600">
            {!isRegister
              ? `Don't have an Storyscape account?`
              : `Already a Storyscape member?`}
          </span>

          <button
            onClick={() => setIsRegister((isRegister = !isRegister))}
            className="text-[14px] text-lime-500 font-semibold pl-1"
          >
            <span>{!isRegister ? "Register" : "log in"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
