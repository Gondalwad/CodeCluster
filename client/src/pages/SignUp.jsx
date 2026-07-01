// to be developed by ritika...

import Button from "./ui/Button";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-950 px-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Sign up to get started.
        </p>

        <form className="space-y-5">

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-600"
            />
          </div>

          <Button
            value="Create Account"
            className="w-full py-3 mt-2"
          />

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