import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="mx-auto w-full max-w-lg bg-white rounded-2xl p-10 border border-gray-200 shadow-lg">
        <div className="mb-6 flex flex-col items-center">
          <span className="inline-block w-full max-w-[100px] mb-2">
            <Logo width="100%" />
          </span>
          <h2 className="text-center text-2xl font-bold leading-tight text-gray-800">Sign up to create account</h2>
          <p className="mt-2 text-center text-base text-gray-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition"
            >
              Sign In
            </Link>
          </p>
        </div>
        {error && <p className="text-red-600 mb-4 text-center font-medium">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-4">
          <div className="space-y-6">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;