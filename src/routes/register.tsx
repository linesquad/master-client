import { signUp } from "@/modules/auth/services/auth";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-hot-toast";

export const Route = createFileRoute({
  component: Register,
});

function Register() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      role: "client",
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await signUp(
          value.fullName,
          value.email,
          value.password,
          value.phone,
          value.role
        );
        toast.success("User registered successfully");
        console.log(response);
        console.log(value);
        navigate({ to: "/" });
      } catch (error) {
        toast.error("Registration failed. Please try again.");
        console.error(error);
      }
    },
  });

  return (
    <div>
      <form 
        className="flex flex-col gap-4" 
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="fullName"
          validators={{
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              if (!value) {
                return "Full name is required";
              }
              if (value.length < 2) {
                return "Full name must be at least 2 characters long";
              }
              if (!/^[a-zA-Z\s]+$/.test(value)) {
                return "Full name should only contain letters and spaces";
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <div>
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors && (
                <p className="text-red-500">{field.state.meta.errors[0]}</p>
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
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors && (
                <p className="text-red-500">{field.state.meta.errors[0]}</p>
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
              if (value.length < 8) {
                return "Password must be at least 8 characters long";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                return "Password must contain at least one special character";
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors && (
                <p className="text-red-500">{field.state.meta.errors[0]}</p>
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
                return "Phone number is required";
              }
              if (value.length < 10) {
                return "Phone number must be at least 10 characters long";
              }
              if (!/^\+?[0-9\s-()]+$/.test(value)) {
                return "Phone number can only contain digits, spaces, hyphens, and parentheses";
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <div>
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors && (
                <p className="text-red-500">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button 
              type="submit" 
              className="cursor-pointer bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-400"
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}