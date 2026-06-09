import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-app/95 backdrop-blur-sm border-b border-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <span className="font-mono font-bold text-3xl text-secondary tracking-tight">
                    PrepAI
                </span>

                <Link
                    to="/signup"
                    className="bg-primary hover:bg-primary-600 transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
                >
                    Get Started
                </Link>
            </div>
        </nav>
    )
}