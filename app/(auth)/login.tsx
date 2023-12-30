import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";

import { ShowErrorObject } from "@/types/types";
import TextInput from "@/components/text-input";

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const [error, setError] = useState<ShowErrorObject | null>(null);

  const showError = (type: string) => {
    if (error && Object.entries(error).length > 0 && error?.type == type) {
      return error.message;
    }
    return "";
  };

  const login = () => {
    console.log("login");
  };

  return (
    <div>
      <h1 className="text-center text-[28px] mb-4 font-bold">Log in</h1>

      <div className="px-6 pb-2">
        <TextInput
          string={email}
          placeholder="Email address"
          onUpdate={setEmail}
          inputType="email"
          error={showError("email")}
        />
      </div>

      <div className="px-6 pb-2">
        <TextInput
          string={password}
          placeholder="Password"
          onUpdate={setPassword}
          inputType="password"
          error={showError("password")}
        />
      </div>

      <div className="px-6 pb-2 mt-6">
        <button
          disabled={loading}
          onClick={login}
          className={`
                flex items-center justify-center w-full text-[17px] font-semibold text-white py-3 rounded-md
                ${!email || !password ? "bg-gray-200" : "bg-lime-500"}
            `}
        >
          {loading ? (
            <BiLoaderCircle
              className="animate-spin"
              color="#ffffff"
              size={25}
            />
          ) : (
            "Log in"
          )}
        </button>
      </div>
    </div>
  );
}
