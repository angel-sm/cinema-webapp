"use client";
import { useForm } from "react-hook-form";
import PrimaryButton from "../_components/buttons/primary-button/primary-button";
import { EmailIcon } from "../_assets/icons/email.icon";
import { EyeIcon } from "../_assets/icons/eye.icon";
import InputErrorMessage from "../_components/input-error-message";
import { signinService } from "../_services/authService";
import { useAppDispatch } from "../_lib/redux/hooks";
import { signin } from "../_lib/redux/features/authSlice";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const formData = data as FormData;
    const user = await signinService({
      email: formData.email,
      password: formData.password,
    });
    dispatch(
      signin({
        id: user.id,
        email: user.email,
      })
    );
    window.localStorage.setItem("idToken", user.token);
    router.push("/home");
  };

  const emailInputContainer = (
    <div>
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <div className="relative">
        <input
          id="email"
          type="email"
          className="w-full rounded-lg border-gray-400 border-2 p-4 pe-12 text-sm"
          placeholder="Enter email"
          {...register("email", { required: "email is required" })}
        />
        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
          <EmailIcon />
        </span>
      </div>
      {errors.email && <InputErrorMessage message={errors?.email?.message} />}
    </div>
  );

  const passwordInputContainer = (
    <div>
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <div className="relative">
        <input
          id="password"
          type="password"
          className="w-full rounded-lg border-gray-400 border-2 p-4 pe-12 text-sm"
          placeholder="Enter password"
          {...register("password", { required: "password is required" })}
        />
        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
          <EyeIcon />
        </span>
      </div>
      {errors.password && (
        <InputErrorMessage message={errors?.password?.message} />
      )}
    </div>
  );

  return (
    <div className="w-2/5 m-auto px-4 py-10 sm:px-6 lg:px-8">
      <>
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Sign in</h1>
          <p className="mt-4 text-gray-400 w-3/4 m-auto text-sm">
            Book Your Movie Adventure - Sign In to Reserve Your Seats Now!
            🍿🎬🎟️🎥
          </p>
        </div>
        <form
          className="mx-auto mb-0 mt-8 max-w-md space-y-4 w-4/5"
          onSubmit={handleSubmit(onSubmit)}
        >
          {emailInputContainer}
          {passwordInputContainer}
          <div className="flex items-center justify-end">
            <PrimaryButton title="Enter" type="submit" />
          </div>
        </form>
      </>
    </div>
  );
}

export default Login;
