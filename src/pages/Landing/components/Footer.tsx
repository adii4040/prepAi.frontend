import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="bg-app border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-headline font-semibold text-lg text-secondary mb-1">
            PrepAI
          </p>
          <p className="text-xs text-neutral">
            © 2024 PrepAI. Know your gaps. Own your prep.
          </p>
        </div>

        <div className="flex items-center gap-6">
          {[
            { label: 'Login', to: '/login' },
            { label: 'Get Started', to: '/signup' },
            { label: 'Privacy', to: '/privacy' },
            { label: 'Terms', to: '/terms' },
          ].map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="text-sm text-neutral hover:text-secondary transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}