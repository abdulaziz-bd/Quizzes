import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { loginUser } from "../../redux/features/auth/authSlice";
import Field from "../common/Field";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { auth, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      await dispatch(loginUser(formData)).unwrap();

      const destination = location.state?.from || "/";
      navigate(destination, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);

      setError("root", {
        type: "manual",
        random: {
          message: err || "Invalid username or password",
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="mb-4">
        <Field
          label="Enter your username or email address"
          error={errors.email}
        >
          <input
            {...register("email", {
              required: "Username or Email is required",
            })}
            className={`w-full px-4 py-3 rounded-lg border ${
              !!errors.email ? "border-red-500" : "border-gray-300"
            }`}
            name="email"
            type="email"
            id="email"
          />
        </Field>
      </div>
      <div className="mb-6">
        <Field label="Enter your Password" error={errors.password}>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Your password must at least 8 characters!",
              },
            })}
            className={`w-full px-4 py-3 rounded-lg border ${
              !!errors.password ? "border-red-500" : "border-gray-300"
            }`}
            name="password"
            type="password"
            id="password"
          />
        </Field>
      </div>
      <p>{errors?.root?.random?.message}</p>
      <div className="mb-6 flex gap-2 items-center">
        <input
          {...register("isAdmin")}
          type="checkbox"
          id="admin"
          className={`px-4 py-3 rounded-lg border ${
            !!errors.isAdmin ? "border-red-500" : "border-gray-300"
          }`}
        />
        <label htmlFor="admin">Login as Admin</label>
      </div>
      <Field>
        <button
          className="w-full bg-primary text-white py-3 rounded-lg mb-4"
          type="submit"
        >
          Login
        </button>
      </Field>
    </form>
  );
};

export default LoginForm;
