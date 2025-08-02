import { motion } from 'framer-motion';
import { ArrowDown, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Scene3D from '../Scene3D';
import TypingEffect from '../TypingEffect';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  const downloadResume = () => {
    // In a real app, this would download the actual resume
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // You would place your resume PDF in the public folder
    link.download = 'John_Doe_Resume.pdf';
    link.click();
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Scene3D />
      </div>

      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.div
              className="space-y-4"
              variants={itemVariants}
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold leading-tight"
                variants={itemVariants}
              >
                Hi, I'm{' '}
                <span className="gradient-text">
                  John Doe
                </span>
              </motion.h1>
              
              <div className="text-xl md:text-2xl text-muted-foreground h-16">
                <TypingEffect
                  texts={[
                    "Full Stack Developer",
                    "React Specialist", 
                    "UI/UX Enthusiast",
                    "Problem Solver"
                  ]}
                  className="gradient-text font-semibold"
                />
              </div>
            </motion.div>

            <motion.p 
              className="text-lg text-muted-foreground max-w-lg leading-relaxed"
              variants={itemVariants}
            >
              I craft exceptional digital experiences through innovative web solutions. 
              Passionate about creating beautiful, functional, and user-centric applications.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Button
                onClick={downloadResume}
                className="hero-button group"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Download Resume
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="glass-card border-primary/30 hover:bg-primary/10 transition-all duration-300"
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                View My Work
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex space-x-6 pt-8"
              variants={itemVariants}
            >
              {[
                { name: 'GitHub', url: 'https://github.com' },
                { name: 'LinkedIn', url: 'https://linkedin.com' },
                { name: 'Twitter', url: 'https://twitter.com' }
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  {social.name}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Scene */}
          <motion.div
            className="h-96 lg:h-[600px] relative"
            variants={itemVariants}
          >
            <div className="absolute inset-0 bg-gradient-glow rounded-3xl opacity-20 blur-3xl" />
            <div className="relative h-full glass-card rounded-3xl overflow-hidden">
              <Scene3D className="w-full h-full" />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-muted-foreground"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;