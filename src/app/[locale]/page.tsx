import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ValuesSection from '@/components/ValuesSection';
import OurServicesSection from '@/components/OurServicesSection';
import ProcessSection from '@/components/ProcessSection';
import ProjectsSection from '@/components/ProjectsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import VideoSection from '@/components/VideoSection';
import CTASection from '@/components/CTASection';
import TimelineSection from '@/components/TimelineSection';
import MemberCompaniesSection from '@/components/MemberCompaniesSection';
import PartnersSection from '@/components/PartnersSection';
import BenefitsSection from '@/components/BenefitsSection';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ValuesSection />
      <OurServicesSection />
      <BenefitsSection />
      <ProcessSection />
      <ProjectsSection />
      <TestimonialsSection />
      <VideoSection />
      <CTASection />
      <MemberCompaniesSection />
      <PartnersSection />
      <Footer />
    </main>
  );
}
