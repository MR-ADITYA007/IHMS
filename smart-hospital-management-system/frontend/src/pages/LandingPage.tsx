import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import KeyFeaturesSection from '../components/KeyFeaturesSection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <KeyFeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
