import {
    Navbar,
    HeroSection,
    HowItWorksSection,
    FeaturesSection,
    ManifestoSection,
    StatsSection,
    Footer,
} from '../components'

export const LandingContainer = () => {
    return (
        <div className="min-h-screen bg-app">
            <Navbar />
            <HeroSection />
            <HowItWorksSection />
            <FeaturesSection />
            <ManifestoSection />
            <StatsSection />
            <Footer />
        </div>
    )
}