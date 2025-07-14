import { getUserId, signIn } from "@/modules/auth/services/auth";
import { useForm } from "@tanstack/react-form";
import { redirect, useNavigate, Link } from "@tanstack/react-router";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { FaPeopleArrows, FaUserPlus, FaArrowLeft } from "react-icons/fa";

export const Route = createFileRoute({
  component: Login,
  beforeLoad: async () => {
    const user = await getUserId().catch(() => null);
    if (user) {
      throw redirect({ to: "/" });
    }
  },
});

function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await signIn(value.email, value.password);
        toast.success("User logged in successfully");
        queryClient.invalidateQueries({ queryKey: ["user"] });
        navigate({ to: "/" });
      } catch (error) {
        toast.error("Login failed. Please try again.");
        console.error(error);
      }
    },
  });

  return (
    <div
      className="flex items-center justify-center py-12 px-10 sm:px-6 lg:px-8 min-h-screen bg-gray-300 dark:bg-gray-900 transition-colors duration-300"
      style={{
        backgroundImage: "url('/authbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md w-full space-y-8">
        <div className="flex items-center justify-center mr-10">
          <img className="h-10 w-10" src="/projectlogo.webp" alt="Logo" />
          <span className=" text-3xl font-bold text-white">IRKLE</span>
        </div>
        <div className="relative">
          <div className="hidden md:block">
            <Link to="/login">
              <div className="absolute top-[58.5px] -left-[115px] z-10 flex items-center justify-center gap-2 rounded-t-lg bg-[#34B1EB] px-12 py-4 rotate-270 cursor-pointer hover:text-[#34B1EB] hover:bg-[#F1F1F1] transition-all duration-300 group">
                <FaPeopleArrows className="text-2xl text-white group-hover:text-[#34B1EB] transition-all duration-300" />
                <span className="text-sm text-white font-semibold group-hover:text-[#34B1EB] transition-all duration-300">
                  Sign in
                </span>
              </div>
            </Link>
            <Link to="/register">
              <div className="absolute top-[260.5px] -left-[133px] z-10 flex items-center justify-center gap-2 rounded-t-lg bg-[#F1F1F1] dark:bg-gray-800 px-12 py-4 rotate-270 cursor-pointer hover:bg-[#34B1EB] hover:text-white transition-all duration-300 group">
                <FaUserPlus className="text-2xl text-[#34B1EB] group-hover:text-white transition-all duration-300" />
                <span className="text-sm font-semibold text-black dark:text-white group-hover:text-white transition-all duration-300">
                  Registration
                </span>
              </div>
            </Link>
          </div>
          <form
            className="mt-8 space-y-6 md:rounded-xl rounded-none md:rounded-tl-none py-6 px-12 bg-white dark:bg-gray-800 pt-12 transition-colors duration-300"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <h2 className="mt-6 text-start text-xl text-black dark:text-white font-semibold">
              Sign In Your Account
            </h2>
            <div className="flex items-start justify-start gap-1">
              <div className="flex items-center justify-center  bg-[#34B1EB] rounded-xl w-2 h-1"></div>
              <div className="flex items-center justify-center  bg-[#34B1EB] rounded-xl w-4 h-1"></div>
            </div>
            <div className="space-y-3">
              <form.Field
                name="email"
                validators={{
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    if (!value) {
                      return "Email is required";
                    }
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                      return "Please enter a valid email address";
                    }
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="appearance-none relative block w-full px-3 py-3 border-b border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-transparent rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors duration-300"
                      placeholder="Enter your email"
                    />
                    {field.state.meta.errors && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="password"
                validators={{
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    if (!value) {
                      return "Password is required";
                    }
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="appearance-none relative block w-full px-3 py-3 border-b border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-transparent rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors duration-300"
                      placeholder="Enter your password"
                    />
                    {field.state.meta.errors && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
            </div>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
              )}
            </form.Subscribe>
            <div className="flex items-center justify-between">
              <Link
                to="/register"
                className="text-sm text-[#2C5BE3] dark:text-blue-400 hover:text-[#2C5BE3]/80 dark:hover:text-blue-300 transition-colors duration-300"
              >
                Lost your password?
              </Link>
              <div className="flex items-center justify-center gap-2 hover:text-[#2C5BE3]/80 dark:hover:text-blue-300 group">
                <FaArrowLeft className="text-xs text-[#2C5BE3] dark:text-blue-400 font-extralight group-hover:text-[#2C5BE3]/80 dark:group-hover:text-blue-300 transition-colors duration-300" />
                <Link
                  to="/"
                  className="text-sm text-[#2C5BE3] dark:text-blue-400 group-hover:text-[#2C5BE3]/80 dark:group-hover:text-blue-300 transition-colors duration-300"
                >
                  Home
                </Link>
              </div>
            </div>
          </form>
          <div className="flex flex-row w-full items-center justify-between md:hidden">
            <Link to="/login" className="w-full">
              <div className="flex items-center justify-center gap-2 bg-[#34B1EB]  py-4 cursor-pointer">
                <FaPeopleArrows className="text-2xl text-white" />
                <span className="text-sm text-white font-semibold">Login</span>
              </div>
            </Link>
            <Link to="/register" className="w-full">
              <div className="flex items-center justify-center gap-2 bg-[#F1F1F1] dark:bg-gray-800 py-4 cursor-pointer hover:bg-[#34B1EB] hover:text-white transition-all duration-300 group">
                <FaUserPlus className="text-2xl text-[#34B1EB] group-hover:text-white transition-all duration-300" />
                <span className="text-sm font-semibold text-black dark:text-white group-hover:text-white transition-all duration-300">
                  Registration
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
