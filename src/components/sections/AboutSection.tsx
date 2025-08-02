import { motion } from 'framer-motion';
import { Code, Palette, Zap, Users } from 'lucide-react';

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const achievements = [
    { number: "50+", label: "Projects Completed" },
    { number: "3+", label: "Years Experience" },
    { number: "20+", label: "Happy Clients" },
    { number: "∞", label: "Lines of Code" }
  ];

  const skills = [
    {
      icon: Code,
      title: "Full Stack Development",
      description: "Building end-to-end applications with modern technologies and best practices."
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Creating intuitive and beautiful user interfaces that enhance user experience."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Optimizing applications for speed, efficiency, and scalability."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Working effectively in agile teams and leading development initiatives."
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              I'm a passionate developer who loves creating digital experiences that make a difference. 
              With a focus on clean code and innovative solutions, I turn ideas into reality.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Bio */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6 gradient-text">My Journey</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Started my journey in web development 3 years ago with a simple "Hello World" 
                    and never looked back. What began as curiosity has evolved into a passionate 
                    career in creating meaningful digital experiences.
                  </p>
                  <p>
                    I specialize in React, Node.js, and modern web technologies. I believe in 
                    writing clean, maintainable code and creating applications that not only 
                    function perfectly but also provide exceptional user experiences.
                  </p>
                  <p>
                    When I'm not coding, you'll find me exploring new technologies, contributing 
                    to open source projects, or mentoring aspiring developers in the community.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div className="grid grid-cols-2 gap-6" variants={itemVariants}>
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  className="glass-card p-6 text-center rounded-xl"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Skills Grid */}
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" variants={itemVariants}>
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <motion.div
                  key={skill.title}
                  className="glass-card p-6 rounded-xl group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                >
                  <div className="mb-4">
                    <IconComponent className="h-12 w-12 text-primary group-hover:glow transition-all duration-300" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2 group-hover:gradient-text transition-all duration-300">
                    {skill.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {skill.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;