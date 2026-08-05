// developed by -- ritika

import { useState } from "react";
import { Link } from "react-router-dom";
import { signIn } from "../jsFunctions";

export default function SignIn() {
  if (localStorage.getItem("jwt")) {
    return window.location.href="/Home";
  }
  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await signIn(
      form.usernameOrEmail,
      form.password
    );

    if (success) {
      window.location.href = "/Home";
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-950 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">
          Sign In
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Welcome back! Please login to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Username or Email
            </label>

            <input
              type="text"
              name="usernameOrEmail"
              placeholder="Enter your username or email"
              value={form.usernameOrEmail}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-20 outline-none focus:border-indigo-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-indigo-600 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-indigo-600 text-sm hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-5 py-3 rounded-xl border-2 border-indigo-600 transition-all duration-200 hover:bg-indigo-500 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?
          <Link
            to="/signup"
            className="text-indigo-600 font-semibold hover:underline ml-1"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
