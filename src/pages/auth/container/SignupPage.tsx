import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from '../../../modules/auth/mutation/useSignup';

type SignupFormValues = {
  fullname: string;
  email: string;
  password: string;
};

const initialValues: SignupFormValues = {
  fullname: '',
  email: '',
  password: '',
};

const SignupPage = () => {
  const navigate = useNavigate();
  const {mutateAsync: signupMutation, isPending: isSignupPending} = useSignup();

 const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors: Partial<Record<keyof SignupFormValues, string>> = {};

      if (!values.fullname.trim()) {
        errors.fullname = 'Full name is required';
      }

      if (!values.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = 'Enter a valid email address';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }

      return errors;
    },
    onSubmit: async (values, { setStatus, resetForm }) => {
      setStatus(undefined);

      try {
        await signupMutation(values);
        resetForm();
        navigate('/login');
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Failed to create account';
        setStatus(message);
      }
    },
  });



  return (
    <main className="flex min-h-[100svh] items-center justify-center px-5 py-8 bg-[radial-gradient(circle_at_top,_rgba(170,59,255,0.12),_transparent_38%)] bg-no-repeat bg-neutral-50/20">
      
      <section className="w-full max-w-[440px] rounded-[24px] border border-border bg-white/78 backdrop-blur-[18px] p-8 shadow-sm text-left">
        
        <div className="mb-6">
          <p className="m-0 mb-2 text-xs font-bold text-primary tracking-widest uppercase">
            Create account
          </p>
          <h1 className="m-0 text-[36px] font-bold tracking-tight leading-[1.05] text-secondary">
            Sign up
          </h1>
          <p className="mt-3 text-sm text-neutral">
            Register your account to start unmasking resumes.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="grid gap-4">
            
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-secondary">
                Full name
              </span>
              <input
                name="fullname"
                type="text"
                autoComplete="name"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Jane Doe"
                className={`w-full rounded-[14px] border bg-white/96 px-4 py-[14px] text-sm text-secondary outline-none transition-colors
                  ${formik.touched.fullname && formik.errors.fullname
                    ? 'border-danger focus:border-danger'
                    : 'border-border focus:border-primary'
                  }`}
              />
              {formik.touched.fullname && formik.errors.fullname && (
                <span className="text-danger text-xs">{formik.errors.fullname}</span>
              )}
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-secondary">
                Email
              </span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="jane@company.com"
                className={`w-full rounded-[14px] border bg-white/96 px-4 py-[14px] text-sm text-secondary outline-none transition-colors
                  ${formik.touched.email && formik.errors.email
                    ? 'border-danger focus:border-danger'
                    : 'border-border focus:border-primary'
                  }`}
              />
              {formik.touched.email && formik.errors.email && (
                <span className="text-danger text-xs">{formik.errors.email}</span>
              )}
            </label>


            <label className="grid gap-2">
              <span className="text-sm font-semibold text-secondary">
                Password
              </span>
              <input
                name="password"
                type="password"
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="At least 6 characters"
                className={`w-full rounded-[14px] border bg-white/96 px-4 py-[14px] text-sm text-secondary outline-none transition-colors
                  ${formik.touched.password && formik.errors.password
                    ? 'border-danger focus:border-danger'
                    : 'border-border focus:border-primary'
                  }`}
              />
              {formik.touched.password && formik.errors.password && (
                <span className="text-danger text-xs">{formik.errors.password}</span>
              )}
            </label>

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
              disabled={isSignupPending || formik.isSubmitting}
              className="w-full rounded-[14px] border-none bg-gradient-to-br from-primary to-primary-600 px-4 py-[14px] text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {isSignupPending || formik.isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>

        <p className="mt-5 text-sm text-neutral">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline no-underline">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default SignupPage;