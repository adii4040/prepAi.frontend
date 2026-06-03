

import { useMemo } from 'react';
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
  const loginMutation = useLogin();

  const formik = useFormik<LoginFormValues>({
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
        await loginMutation.mutateAsync(values);
        resetForm();
        navigate('/dashboard');
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Failed to log in';
        setStatus(message);
      }
    },
  });

  const isSubmitting = useMemo(
    () => formik.isSubmitting || loginMutation.isPending,
    [formik.isSubmitting, loginMutation.isPending]
  );

  return (
    <main
      style={{
        minHeight: '100svh',
        display: 'grid',
        placeItems: 'center',
        padding: '32px 20px',
        background:
          'radial-gradient(circle at top, rgba(170, 59, 255, 0.12), transparent 38%), linear-gradient(180deg, rgba(8, 6, 13, 0.03), transparent 30%)',
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: '440px',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.78)',
          backdropFilter: 'blur(18px)',
          boxShadow: 'var(--shadow)',
          padding: '32px',
          textAlign: 'left',
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <p
            style={{
              margin: '0 0 8px',
              color: 'var(--accent)',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Welcome back
          </p>
          <h1 style={{ margin: 0, fontSize: '36px', lineHeight: 1.05, color: '#111827' }}>
            Sign in
          </h1>
          <p style={{ marginTop: '12px', color: '#4b5563' }}>
            Continue to your dashboard with your existing account.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} noValidate>
          <div style={{ display: 'grid', gap: '16px' }}>
            <label style={{ display: 'grid', gap: '8px' }}>
              <span style={{ fontWeight: 600, color: '#111827' }}>
                Email
              </span>
              <input
                className="auth-input"
                name="email"
                type="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="jane@company.com"
                style={inputStyle}
              />
              {formik.touched.email && formik.errors.email ? (
                <span style={errorStyle}>{formik.errors.email}</span>
              ) : null}
            </label>

            <label style={{ display: 'grid', gap: '8px' }}>
              <span style={{ fontWeight: 600, color: '#111827' }}>
                Password
              </span>
              <input
                className="auth-input"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Your password"
                style={inputStyle}
              />
              {formik.touched.password && formik.errors.password ? (
                <span style={errorStyle}>{formik.errors.password}</span>
              ) : null}
            </label>

            {formik.status ? (
              <div
                role="alert"
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: 'rgba(220, 38, 38, 0.08)',
                  color: '#b91c1c',
                  border: '1px solid rgba(220, 38, 38, 0.2)',
                }}
              >
                {formik.status}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              style={buttonStyle}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <p style={{ marginTop: '20px', color: '#4b5563' }}>
          New here?{' '}
          <Link to="/signup" style={linkStyle}>
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  borderRadius: '14px',
  border: '1px solid var(--border)',
  padding: '14px 16px',
  font: 'inherit',
  color: '#111827',
  background: 'rgba(255, 255, 255, 0.96)',
  outline: 'none',
};

const buttonStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '14px',
  padding: '14px 16px',
  font: 'inherit',
  fontWeight: 700,
  color: 'white',
  background: 'linear-gradient(135deg, var(--accent), #7c3aed)',
  cursor: 'pointer',
};

const errorStyle: React.CSSProperties = {
  color: '#b91c1c',
  fontSize: '14px',
};

const linkStyle: React.CSSProperties = {
  color: 'var(--accent)',
  fontWeight: 600,
  textDecoration: 'none',
};

export default LoginPage;