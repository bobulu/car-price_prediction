import React, { useState } from "react";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from "./Logo";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const createAcc = async (data) => {
    setError("");
    setLoading(true);
    try {
      const userData = await authService.userAcount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message || "User account was not created");
      console.log("User account creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br  bg-slate-900 p-4">
      <div className="w-full max-w-md bg-gray-800 text-white rounded-2xl p-8 shadow-2xl border border-gray-700">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <span className="inline-block text-white text-xl font-bold"><Logo /></span>
        </div>

        <h2 className="text-center text-red-600 text-3xl font-bold ">welcome</h2>
        <p className="mt-2 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Sign in
          </Link>
        </p>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(createAcc)} className="mt-6">
          <div className="space-y-4">
            <input
              className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter your full name"
              {...register("name", { required: "Full Name is required" })}
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}

            <input
              className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}

            <input
              className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            />
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}

            {/* Loader & Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
