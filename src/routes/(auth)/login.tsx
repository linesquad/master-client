import { getUserId } from "@/modules/auth/services/auth";
import { useForm } from "@tanstack/react-form";
import { redirect, Link } from "@tanstack/react-router";
import { FaPeopleArrows, FaUserPlus, FaArrowLeft } from "react-icons/fa";
import { useLoginUser } from "@/modules/auth/hooks/use-login-user";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("common");
  const { mutate: loginUser, isPending } = useLoginUser();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      loginUser({ email: value.email, password: value.password });
    },
  });

  return (
    <div
      className="flex items-center justify-center py-12 px-10 sm:px-6 lg:px-8 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "#f0f9ff" }}
    >
      <title>Professionals | {t("navigation.login")}</title>
      <div className="max-w-md w-full space-y-8">
        <div className="flex items-center justify-center mr-10">
          <Link to="/">
            <img src="/favicon.png" alt="Logo" className="w-56 h-56" />
          </Link>
        </div>
        <div className="relative mt-8 md:min-h-[560px]">
          <div className="hidden md:flex absolute inset-y-0 -left-[98.5px] z-10 flex-col justify-between">
            <Link to="/login">
              <div className="flex mt-[50px] items-center justify-center gap-1 rounded-t-lg bg-[#34B1EB] rotate-270 cursor-pointer hover:text-[#34B1EB] hover:bg-[#F1F1F1] transition-all duration-300 group h-12 w-[150px] px-0 shrink-0 ">
                <FaPeopleArrows className="text-xl text-white group-hover:text-[#34B1EB] transition-all duration-300" />
                <span className="text-xs text-white font-semibold group-hover:text-[#34B1EB] transition-all duration-300 whitespace-nowrap leading-none">
                  {t("navigation.login")}
                </span>
              </div>
            </Link>
            <Link to="/register">
              <div className="flex items-center mb-[285px] justify-center gap-1 rounded-t-lg bg-[#F1F1F1] dark:bg-gray-800 rotate-270 cursor-pointer hover:bg-[#34B1EB] hover:text-white transition-all duration-300 group h-12 w-[150px] px-0 shrink-0">
                <FaUserPlus className="text-xl text-[#34B1EB] group-hover:text-white transition-all duration-300" />
                <span className="text-xs font-semibold text-black dark:text-white group-hover:text-white transition-all duration-300 whitespace-nowrap leading-none">
                  {t("navigation.register")}
                </span>
              </div>
            </Link>
          </div>
          <form
            className="space-y-6 md:rounded-xl rounded-none md:rounded-tl-none py-6 px-12 bg-white dark:bg-gray-800 pt-12 transition-colors duration-300 md:h-full"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <h2 className="mt-6 text-start text-xl text-black dark:text-white font-semibold">
              {t("auth.signInYourAccount")}
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
            </div>
            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-700 dark:text-gray-300"
                >
                  {t("auth.rememberMe")}
                </label>
              </div>
            </div> */}

            <form.Subscribe selector={(state) => [state.canSubmit]}>
              {([canSubmit]) => (
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                  disabled={!canSubmit || isPending}
                >
                  {isPending ? t("auth.signingIn") : t("auth.login")}
                </button>
              )}
            </form.Subscribe>
            <div className="flex items-center justify-end">
              {/* <Link
                to="/register"
                className="text-sm text-[#2C5BE3] dark:text-blue-400 hover:text-[#2C5BE3]/80 dark:hover:text-blue-300 transition-colors duration-300"
              >
                {t("auth.forgotPassword")}
              </Link> */}
              <div className="flex items-center justify-center gap-2 hover:text-[#2C5BE3]/80 dark:hover:text-blue-300 group">
                <FaArrowLeft className="text-xs text-[#2C5BE3] dark:text-blue-400 font-extralight group-hover:text-[#2C5BE3]/80 dark:group-hover:text-blue-300 transition-colors duration-300" />
                <Link
                  to="/"
                  className="text-sm text-[#2C5BE3] dark:text-blue-400 group-hover:text-[#2C5BE3]/80 dark:group-hover:text-blue-300 transition-colors duration-300"
                >
                  {t("navigation.home")}
                </Link>
              </div>
            </div>
          </form>
          <div className="flex flex-row w-full items-center justify-between md:hidden">
            <Link to="/login" className="w-full">
              <div className="flex items-center justify-center gap-2 bg-[#34B1EB] px-4 py-4 cursor-pointer">
                <FaPeopleArrows className="text-lg sm:text-2xl text-white" />
                <span className="text-xs sm:text-sm text-white font-semibold">
                  {t("navigation.login")}
                </span>
              </div>
            </Link>
            <Link to="/register" className="w-full">
              <div className="flex items-center justify-center gap-2 bg-[#F1F1F1] dark:bg-gray-800 px-0 sm:px-4 py-4 cursor-pointer hover:bg-[#34B1EB] hover:text-white transition-all duration-300 group">
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
