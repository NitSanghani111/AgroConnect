import React, { useState } from 'react';
import ChangeThemes from '../components/ChangesThemes';
import { DiReact } from 'react-icons/di';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'farmer@gmail.com' && password === '123') {
      localStorage.setItem('role', 'farmer'); // Store role in localStorage
      navigate('/home'); // Redirect to farmer's home page
    } else if (email === 'buyer@gmail.com' && password === '456') {
      localStorage.setItem('role', 'buyer'); // Store role in localStorage
      navigate('/buyer-products'); // Redirect to buyer's products page
    }else if (email === 'admin@gmail.com' && password === '789') {
        localStorage.setItem('role', 'admin'); // Store role in localStorage
        navigate('/farmers');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full min-h-screen flex justify-center items-center bg-base-200 relative">
        <div className="absolute top-5 right-5 z-[99]">
          <ChangeThemes />
        </div>
        <div className="w-full h-screen xl:h-auto xl:w-[30%] 2xl:w-[25%] 3xl:w-[20%] bg-base-100 rounded-lg shadow-md flex flex-col items-center p-5 pb-7 gap-8 pt-20 xl:pt-7">
         
          <span className="xl:text-xl font-semibold">
            Hello, 👋 Welcome Back!
          </span>
          <div className="w-full flex flex-col items-stretch gap-3">
            <label className="input input-bordered min-w-full flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="flex items-center justify-between">
              <div className="form-control">
                <label className="label cursor-pointer gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox w-4 h-4 rounded-md checkbox-primary"
                  />
                  <span className="label-text text-xs">Remember me</span>
                </label>
              </div>
              <a
                href="#"
                className="link link-primary font-semibold text-xs no-underline"
              >
                Forgot Password?
              </a>
            </div>
            <div
              onClick={handleLogin}
              className="btn btn-block btn-primary"
            >
              Log In
            </div>
            <div className="divider text-sm">OR</div>
            <div className="w-full flex justify-center items-center gap-4">
              <button className="btn btn-circle dark:btn-neutral">
                <img
                  className="w-6"
                  src="/icons8-microsoft.svg"
                  alt="microsoft"
                />
              </button>
              <button className="btn btn-circle dark:btn-neutral">
                <img
                  className="w-6"
                  src="/icons8-google.svg"
                  alt="google"
                />
              </button>
              <button className="btn btn-circle dark:btn-neutral">
                <img
                  className="dark:hidden w-6"
                  src="/icons8-apple-black.svg"
                  alt="apple"
                />
                <img
                  className="hidden dark:block w-6"
                  src="/icons8-apple-white.svg"
                  alt="apple"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;