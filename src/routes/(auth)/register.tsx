import { getUserId, signUp } from "@/modules/auth/services/auth";
import { useForm } from "@tanstack/react-form";
import { Link, redirect, useNavigate } from "@tanstack/react-router";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { FaArrowLeft, FaPeopleArrows, FaUserPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute({
  component: Register,
  beforeLoad: async () => {
    const user = await getUserId().catch(() => null);
    if (user) {
      throw redirect({ to: "/" });
    }
  },
});

function Register() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "+995",
      role: "client",
    },
    onSubmit: async ({ value }) => {
      try {
        await signUp(
          value.fullName,
          value.email,
          value.password,
          value.phone,
          value.role
        );
        toast.success(t("auth.registerSuccess"));
        queryClient.invalidateQueries({ queryKey: ["user"] });
        navigate({ to: "/" });
      } catch (error) {
        toast.error(t("auth.registerFailed"));
        console.error(error);
      }
    },
  });

  return (
    <div
      className="flex items-center justify-center py-4 md:py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-300 dark:bg-gray-900 transition-colors duration-300"
      style={{
        backgroundImage: "url('/authbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <title>Professionals | {t("navigation.register")}</title>
      <div className="max-w-md w-full space-y-4">
        <div className="flex items-center justify-center mr-10">
          <Link to="/">
            <img className="w-30 h-30" src="/favicon.png" alt="Logo" />
          </Link>
        </div>
        <div className="relative">
          <div className="hidden md:block">
            <Link to="/login">
              <div className="absolute top-[58.5px] -left-[115px] z-10 flex items-center justify-center gap-2 rounded-t-lg bg-[#34B1EB] px-12 py-4 rotate-270 cursor-pointer">
                <FaPeopleArrows className="text-2xl text-white" />
                <span className="text-sm text-white font-semibold">
                  {t("navigation.login")}
                </span>
              </div>
            </Link>
            <Link to="/register">
              <div className="absolute top-[260.5px] -left-[133px] z-10 flex items-center justify-center gap-2 rounded-t-lg bg-[#F1F1F1] dark:bg-gray-800 px-12 py-4 rotate-270 cursor-pointer hover:bg-[#34B1EB] hover:text-white transition-all duration-300 group">
                <FaUserPlus className="text-2xl text-[#34B1EB] group-hover:text-white transition-all duration-300" />
                <span className="text-sm font-semibold text-black dark:text-white group-hover:text-white transition-all duration-300">
                  {t("navigation.register")}
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
              {t("auth.createYourAccount")}
            </h2>
            <div className="flex items-start justify-start gap-1">
              <div className="flex items-center justify-center  bg-[#34B1EB] rounded-xl w-2 h-1"></div>
              <div className="flex items-center justify-center  bg-[#34B1EB] rounded-xl w-4 h-1"></div>
            </div>
            <div className="space-y-3">
              <form.Field
                name="fullName"
                validators={{
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    if (!value) {
                      return t("validation.fullNameRequired");
                    }
                    if (value.length < 2) {
                      return t("validation.fullNameMinLength");
                    }
                    if (!/^[\p{L}\s]+$/u.test(value)) {
                      return t("validation.fullNameLettersOnly");
                    }
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      {t("auth.fullName")}
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="appearance-none relative block w-full px-3 py-3 border-b border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-transparent rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors duration-300"
                      placeholder={t("auth.enterFullName")}
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
                name="email"
                validators={{
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    if (!value) {
                      return t("validation.emailRequired");
                    }
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                      return t("validation.emailInvalid");
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
                      {t("auth.email")}
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="appearance-none relative block w-full px-3 py-3 border-b border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-transparent rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors duration-300"
                      placeholder={t("auth.enterEmail")}
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
                      return t("validation.passwordRequired");
                    }
                    if (value.length < 8) {
                      return t("validation.passwordMinLength");
                    }
                    if (!/[A-Z]/.test(value)) {
                      return t("validation.passwordUppercase");
                    }
                    if (!/[a-z]/.test(value)) {
                      return t("validation.passwordLowercase");
                    }
                    if (!/[0-9]/.test(value)) {
                      return t("validation.passwordNumber");
                    }
                    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                      return t("validation.passwordSpecial");
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
                      {t("auth.password")}
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="appearance-none relative block w-full px-3 py-3 border-b border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-transparent rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors duration-300"
                      placeholder={t("auth.enterPassword")}
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
                name="phone"
                validators={{
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    if (!value) {
                      return t("validation.phoneRequired");
                    }
                    if (value.length < 10) {
                      return t("validation.phoneMinLength");
                    }
                    if (!/^\+?[0-9\s-()]+$/.test(value)) {
                      return t("validation.phoneInvalid");
                    }
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      {t("auth.phone")}
                    </label>
                    <input
                      id="phone"
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="appearance-none relative block w-full px-3 py-3 border-b border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-transparent rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors duration-300"
                      placeholder={t("auth.enterPhone")}
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
                  {t("auth.rememberMe")}
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
                  {isSubmitting
                    ? t("auth.registering")
                    : t("navigation.register")}
                </button>
              )}
            </form.Subscribe>
            <div className="flex items-center justify-between">
              <Link
                to="/login"
                className="text-sm text-[#2C5BE3] hover:text-[#2C5BE3]/80"
              >
                {t("auth.forgotPassword")}
              </Link>
              <div className="flex items-center justify-center gap-2 hover:text-[#2C5BE3]/80 group">
                <FaArrowLeft className="text-xs text-[#2C5BE3] font-extralight group-hover:text-[#2C5BE3]/80" />
                <Link
                  to="/"
                  className="text-sm text-[#2C5BE3] group-hover:text-[#2C5BE3]/80"
                >
                  {t("navigation.home")}
                </Link>
              </div>
            </div>
          </form>
          <div className="flex flex-row w-full items-center justify-between md:hidden">
            <Link to="/login" className="w-full">
              <div className="z-10 flex items-center justify-center gap-2 bg-[#34B1EB] px-4 py-4 cursor-pointer">
                <FaPeopleArrows className="text-lg sm:text-2xl text-white" />
                <span className="text-xs sm:text-sm text-white font-semibold">
                  {t("navigation.login")}
                </span>
              </div>
            </Link>
            <Link to="/register" className="w-full">
              <div className="z-10 flex items-center justify-center gap-2 bg-[#F1F1F1] dark:bg-gray-800 px-4 py-4 cursor-pointer hover:bg-[#34B1EB] hover:text-white transition-all duration-300 group">
                <FaUserPlus className="text-lg sm:text-2xl text-[#34B1EB] group-hover:text-white transition-all duration-300" />
                <span className="text-xs sm:text-sm font-semibold text-black dark:text-white group-hover:text-white transition-all duration-300">
                  {t("navigation.register")}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
