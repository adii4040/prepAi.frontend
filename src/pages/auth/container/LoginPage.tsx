import { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../../modules/auth/mutation/useLogin';

type LoginFormValues = {
  email: string;
  password: string;
};

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

function LoginPage() {
  const navigate = useNavigate();
  const {mutateAsync: loginMutation, isPending: isLoginPending} = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors: Partial<Record<keyof LoginFormValues, string>> = {};

      if (!values.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = 'Enter a valid email address';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      }

      return errors;
    },
    onSubmit: async (values, { setStatus, resetForm }) => {
      setStatus(undefined);
      try {
        await loginMutation(values);
        resetForm();
        navigate('/dashboard');
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Failed to log in';
        setStatus(message);
      }
    },
  });


  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12 sm:px-6 lg:px-8">

      <div className="w-full max-w-md space-y-8 rounded-xl border border-border bg-white p-8 shadow-sm">
        <h1 className="font-headline text-3xl font-bold text-secondary mb-5 border-b border-border pb-8 text-center">
          Sign in
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          noValidate
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-secondary">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="you@example.com"
              className={`w-full rounded-lg border bg-card px-4 py-3 text-sm text-secondary placeholder:text-neutral outline-none transition-colors
                ${formik.touched.email && formik.errors.email
                  ? 'border-danger focus:border-danger'
                  : 'border-border focus:border-primary'
                }`}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-danger text-xs">{formik.errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-secondary">
                Password
              </label>
            </div>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Your password"
                className={`w-full rounded-lg border bg-card px-4 py-3 pr-16 text-sm text-secondary placeholder:text-neutral outline-none transition-colors
                  ${formik.touched.password && formik.errors.password
                    ? 'border-danger focus:border-danger'
                    : 'border-border focus:border-primary'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral hover:text-secondary transition-colors"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <span className="text-danger text-xs">{formik.errors.password}</span>
            )}
          </div>
          {formik.status && (
            <div
              role="alert"
              className="rounded-lg border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger"
            >
              {formik.status}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoginPending}
            className="w-full rounded-lg bg-primary hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors px-4 py-3 text-sm font-semibold text-white mt-1"
          >
            {isLoginPending ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <div className="mt-8">
          <p className="text-neutral text-sm">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;