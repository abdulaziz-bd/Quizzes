import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/features/auth/authSlice";
import Field from "../common/Field";

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm();

  const submitForm = async (formData) => {
    const userData = {
      full_name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    if (formData.isAdmin) {
      userData.role = "admin";
    }

    try {
      await dispatch(registerUser(userData));

      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);

      setError("root", {
        type: "manual",
        random: {
          message: err || "Something went wrong",
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="">
        <div className="mb-4">
          <Field label="Full Name" className="block mb-2" error={errors.name}>
            <input
              {...register("name", {
                required: "Name is required",
              })}
              type="text"
              id="name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
              placeholder="John Doe"
            />
          </Field>
        </div>

        <div className="mb-4">
          <Field label="Email" className="block mb-2" error={errors.email}>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
              placeholder="Email address"
            />
          </Field>
        </div>
      </div>

      <div className="flex  gap-4">
        <div className="mb-6">
          <Field
            label="Enter your Password"
            className="block mb-2"
            error={errors.password}
          >
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Your password must at least 8 characters!",
                },
              })}
              type="password"
              id="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
              placeholder="Password"
            />
          </Field>
        </div>

        <div className="mb-6">
          <Field
            label="Confirm Password"
            className="block mb-2"
            error={errors.confirmPassword}
          >
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || "Passwords do not match";
                },
              })}
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
              placeholder="Confirm Password"
            />
          </Field>
        </div>
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
        <label htmlFor="admin">Register as Admin</label>
      </div>
      <Field>
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg mb-2"
        >
          Create Account
        </button>
      </Field>
    </form>
  );
}
