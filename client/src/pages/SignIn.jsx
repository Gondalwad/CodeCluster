//  developed by -- ritika


import { useState } from "react";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Sign In Successful!");
    }, 1000);
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

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-600"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}

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
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-3 text-indigo-600 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}

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
            disabled={loading}
            className={`
              w-full
              bg-indigo-600
              text-white
              px-5
              py-3
              rounded-xl
              border-2
              border-indigo-600
              transition-all
              duration-200
              ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-500 cursor-pointer"
              }
            `}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?

          <span className="text-indigo-600 font-semibold cursor-pointer hover:underline ml-1">
            Sign Up
          </span>

        </p>

      </div>

    </div>
  );
}