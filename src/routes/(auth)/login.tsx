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
        const response = await signIn(value.email, value.password);
        toast.success("User logged in successfully");
        console.log(response);
        console.log(value);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        navigate({ to: "/" });
      } catch (error) {
        toast.error("Login failed. Please try again.");
        console.error(error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-300" style={{backgroundImage: "url('/authbg.png')", backgroundSize: "cover", backgroundPosition: "center"}}>
      <div className="max-w-md w-full space-y-8">
        <div className="flex items-center justify-center mr-10">
          <img className="h-10 w-10" src="/vite.svg" alt="Logo" />
          <span className=" text-3xl font-bold text-white">Irkle</span>
        </div>
        <div className="relative">
          <Link to="/login">
            <div className="absolute top-[58.5px] -left-[115px] z-10 flex items-center justify-center gap-2 rounded-t-lg bg-[#34B1EB] px-12 py-4 rotate-270 cursor-pointer">
              <FaPeopleArrows className="text-2xl text-white" />
              <span className="text-sm text-white font-semibold">Sign in</span>
            </div>
          </Link>
          <Link to="/register">
            <div className="absolute top-[260.5px] -left-[133px] z-10 flex items-center justify-center gap-2 rounded-t-lg bg-[#F1F1F1] px-12 py-4 rotate-270 cursor-pointer hover:bg-[#34B1EB] hover:text-white transition-all duration-300 group">
              <FaUserPlus className="text-2xl text-[#34B1EB] group-hover:text-white transition-all duration-300" />
              <span className="text-sm font-semibold text-black group-hover:text-white transition-all duration-300">
                Registration
              </span>
            </div>
          </Link>
          <form
            className="mt-8 space-y-6 rounded-xl rounded-tl-none py-6 px-12 bg-white pt-12"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <h2 className="mt-6 text-start text-xl text-black font-semibold">
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
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="appearance-none relative block w-full px-3 py-3 border-b border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your email"
                    />
                    {field.state.meta.errors && (
                      <p className="mt-1 text-sm text-red-600">
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
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="appearance-none relative block w-full px-3 py-3 border-b border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your password"
                    />
                    {field.state.meta.errors && (
                      <p className="mt-1 text-sm text-red-600">
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
                <label htmlFor="remember" className="text-sm text-gray-700">
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
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
              )}
            </form.Subscribe>
            <div className="flex items-center justify-between">
              <Link
                to="/_auth/register"
                className="text-sm text-[#2C5BE3] hover:text-[#2C5BE3]/80"
              >
                Lost your password?
              </Link>
              <div className="flex items-center justify-center gap-2 hover:text-[#2C5BE3]/80 group">
                <FaArrowLeft className="text-xs text-[#2C5BE3] font-extralight group-hover:text-[#2C5BE3]/80" />
                <Link
                  to="/"
                  className="text-sm text-[#2C5BE3] group-hover:text-[#2C5BE3]/80"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
