import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import SimpleParticles from '@/components/SimpleParticles';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import ResumeSection from '@/components/sections/ResumeSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [currentParticleVariant, setCurrentParticleVariant] = useState<'hero' | 'about' | 'skills' | 'projects' | 'resume' | 'contact'>('hero');

  // Handle section scrolling
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            setCurrentParticleVariant(section as typeof currentParticleVariant);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-background relative"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Animated Particle Background */}
      <AnimatePresence mode="wait">
        <SimpleParticles key={currentParticleVariant} variant={currentParticleVariant} />
      </AnimatePresence>

      {/* Navigation */}
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={scrollToSection} 
      />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <motion.div
          id="hero"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <HeroSection />
        </motion.div>

        {/* About Section */}
        <motion.div
          id="about"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <AboutSection />
        </motion.div>

        {/* Skills Section */}
        <motion.div
          id="skills"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <SkillsSection />
        </motion.div>

        {/* Projects Section */}
        <motion.div
          id="projects"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <ProjectsSection />
        </motion.div>

        {/* Resume Section */}
        <motion.div
          id="resume"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <ResumeSection />
        </motion.div>

        {/* Contact Section */}
        <motion.div
          id="contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <ContactSection />
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="py-12 border-t border-primary/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-6">
            <div className="text-center space-y-4">
              <motion.div
                className="text-2xl font-bold gradient-text"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                John Doe
              </motion.div>
              <p className="text-muted-foreground">
                Building the future, one line of code at a time.
              </p>
              <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
                <span>© 2024 John Doe. All rights reserved.</span>
                <span>•</span>
                <span>Made with ❤️ and React</span>
              </div>
            </div>
          </div>
        </motion.footer>
      </main>
    </motion.div>
  );
};

export default Index;
