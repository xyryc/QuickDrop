import TravelLogin from "@/assets/images/login.jpg";
import { Link } from "react-router-dom";
// import Logo from "@/assets/icons/Logo";
import { LoginForm } from "@/components/modules/Authentication/LoginForm";

export default function Login() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-gradient-to-tr from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-950">
      {/* Left: Login Form */}
      <div className="flex flex-col gap-6 p-4 md:p-10 lg:p-16 justify-center">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-blue-700 dark:text-blue-300 hover:underline">
            {/* <Logo /> */}
            <span>Logisti Core</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md bg-white dark:bg-gray-950/80 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl py-10 px-6 md:px-8">
            <h1 className="text-3xl font-semibold text-center text-blue-700 dark:text-blue-300 mb-6">
              Login to your account
            </h1>
            <LoginForm />
            <div className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 dark:text-blue-300 font-medium hover:underline">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Right: Image with hover effect */}
      <div className="relative hidden lg:block overflow-hidden group">
        <img
          src={TravelLogin}
          alt="Login background"
          className="absolute inset-0 h-full w-full object-cover rounded-l-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:brightness-90 group-hover:saturate-150"
        />
        {/* Overlay for hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent group-hover:from-blue-900/60 transition-all duration-500" />
        <div className="absolute left-0 bottom-0 p-8 text-white text-2xl font-bold bg-gradient-to-r from-blue-900/80 to-transparent w-full transition-all duration-500 group-hover:backdrop-blur-lg">
          Welcome to Logisti Core
        </div>
        {/* Decorative floating shapes for extra beauty */}
        <div className="absolute top-10 right-10 w-10 h-10 bg-blue-300/50 rounded-full blur-lg group-hover:scale-125 transition duration-500" />
        <div className="absolute bottom-20 left-10 w-6 h-6 bg-pink-300/40 rounded-full blur-md group-hover:scale-150 transition duration-500" />
      </div>
    </div>
  );
}