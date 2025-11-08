'use client';

import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('../sections/Hero'), { ssr: false });
const Features = dynamic(() => import('../sections/Features'), { ssr: false });
const Stats = dynamic(() => import('../sections/Stats'), { ssr: false });
const HowItWorks = dynamic(() => import('../sections/HowItWorks'), { ssr: false });
const Testimonials = dynamic(() => import('../sections/Testimonials'), { ssr: false });
const Pricing = dynamic(() => import('../sections/Pricing'), { ssr: false });
const Demo = dynamic(() => import('../sections/Demo'), { ssr: false });
const Integrations = dynamic(() => import('../sections/Integrations'), { ssr: false });
const Security = dynamic(() => import('../sections/Security'), { ssr: false });
const About = dynamic(() => import('../sections/About'), { ssr: false });
const Team = dynamic(() => import('../sections/Team'), { ssr: false });
const Blog = dynamic(() => import('../sections/Blog'), { ssr: false });
const FAQ = dynamic(() => import('../sections/FAQ'), { ssr: false });
const Contact = dynamic(() => import('../sections/Contact'), { ssr: false });

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Features />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Demo />
      <Integrations />
      <Security />
      <About />
      <Team />
      <Blog />
      <FAQ />
      <Contact />
    </div>
  );
}
