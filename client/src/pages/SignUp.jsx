// developed by ritika...

import { useState } from "react";

export default function SignUp() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    }

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

    if (!form.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match.";
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
      alert("Account Created Successfully!");
    }, 1000);
  };

  const getPasswordStrength = () => {
    if (!form.password) return "";

    if (form.password.length < 6)
      return "Weak";

    if (
      /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(
        form.password
      )
    )
      return "Strong";

    return "Medium";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-950 px-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Sign up to get started.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-600"
            />

            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName}
              </p>
            )}

          </div>

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
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
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

            {form.password && (
              <p className="text-sm mt-2">
                Password Strength:
                <span className="font-semibold ml-1">
                  {getPasswordStrength()}
                </span>
              </p>
            )}

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}

          </div>

          <div>

            <label className="block mb-2 font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-20 outline-none focus:border-indigo-600"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-3 text-indigo-600 text-sm"
              >
                {showConfirmPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}

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
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?

          <span className="text-indigo-600 font-semibold cursor-pointer hover:underline ml-1">
            Sign In
          </span>

        </p>

      </div>

    </div>
  );
}