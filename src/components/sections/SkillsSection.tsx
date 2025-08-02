import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const SkillsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Framer Motion", level: 88 },
        { name: "Three.js", level: 75 }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Express.js", level: 88 },
        { name: "Python", level: 82 },
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 83 },
        { name: "Redis", level: 78 }
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", level: 95 },
        { name: "Docker", level: 80 },
        { name: "AWS", level: 75 },
        { name: "Jest", level: 85 },
        { name: "Figma", level: 90 },
        { name: "Webpack", level: 78 }
      ]
    }
  ];

  const ProgressBar = ({ skill, index }: { skill: { name: string; level: number }, index: number }) => (
    <motion.div
      className="space-y-2"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
        <span className="text-sm text-primary font-semibold">{skill.level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-primary rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1.5, 
            delay: index * 0.1,
            ease: "easeOut"
          }}
        />
      </div>
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive toolkit built through years of hands-on experience 
              and continuous learning in modern web development.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                className="glass-card p-8 rounded-2xl"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring" as const, stiffness: 300 }}
              >
                <h3 className="text-2xl font-bold mb-8 gradient-text text-center">
                  {category.title}
                </h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <ProgressBar 
                      key={skill.name} 
                      skill={skill} 
                      index={categoryIndex * 6 + skillIndex} 
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Achievement Highlights */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {[
              { icon: CheckCircle, text: "Clean Code Advocate", color: "text-green-400" },
              { icon: CheckCircle, text: "Performance Optimizer", color: "text-blue-400" },
              { icon: CheckCircle, text: "Mobile-First Design", color: "text-purple-400" },
              { icon: CheckCircle, text: "Agile Methodology", color: "text-cyan-400" }
            ].map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <motion.div
                  key={achievement.text}
                  className="glass-card p-6 text-center rounded-xl group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring" as const, stiffness: 400 }}
                >
                  <IconComponent className={`h-8 w-8 mx-auto mb-3 ${achievement.color} group-hover:glow transition-all duration-300`} />
                  <p className="text-sm font-medium text-foreground">
                    {achievement.text}
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

export default SkillsSection;