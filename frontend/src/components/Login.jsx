import React, { useState } from "react";
import { Logo, Input, Button } from "../components/index";
import { login as Authlogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = async (data) => {
    setError(""); // Clear previous errors
    setLoading(true); // Show loading state
    try {
      const session = await authService.login(data); // { email, password }
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(Authlogin(userData)); // Dispatch user data to Redux
          navigate("/"); // Redirect to homepage
        }
      }
    } catch (error) {
      setError(error.message || "An error occurred during login"); // Fallback message
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br p-4">
      <div className="w-full max-w-md bg-gray-800 text-white rounded-2xl p-8 shadow-2xl border border-gray-700">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-red-500w text-3xl text-red-600 font-bold">Welcome Back</h2>
        <p className="mt-2 text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {loading && <p className="text-gray-400 mt-2 text-center">Logging in...</p>}

        <form onSubmit={handleSubmit(handleLogin)} className="mt-6">
          <div className="space-y-4">
            <Input
              className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              label="Email"
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
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}

            <Input
              className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                "Sign in"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
