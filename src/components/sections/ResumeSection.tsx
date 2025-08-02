import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Eye, Calendar, MapPin, Building, GraduationCap } from 'lucide-react';

const ResumeSection = () => {
  const [showPreview, setShowPreview] = useState(false);

  const downloadResume = () => {
    // In a real app, this would download the actual resume
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // You would place your resume PDF in the public folder
    link.download = 'John_Doe_Resume.pdf';
    link.click();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      period: "2022 - Present",
      achievements: [
        "Led development of React-based dashboard serving 10k+ users",
        "Improved application performance by 40% through optimization",
        "Mentored 3 junior developers and established coding standards"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      location: "New York, NY",
      period: "2020 - 2022",
      achievements: [
        "Built and deployed 15+ client websites using React and Node.js",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
        "Collaborated with design team to create pixel-perfect UI components"
      ]
    },
    {
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      period: "2019 - 2020",
      achievements: [
        "Developed responsive web applications using Vue.js",
        "Integrated RESTful APIs and managed state with Vuex",
        "Participated in agile development and sprint planning"
      ]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      location: "California",
      period: "2015 - 2019",
      details: "Graduated Magna Cum Laude, GPA: 3.8/4.0"
    }
  ];

  return (
    <section className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Resume
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore my professional journey and download my complete resume
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="mr-2 h-5 w-5" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
            </div>
          </motion.div>

          {/* Resume Preview */}
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="mb-16"
            >
              <Card className="glass-card border-primary/20">
                <CardContent className="p-8">
                  <div className="grid gap-8">
                    {/* Experience Section */}
                    <motion.div variants={itemVariants}>
                      <h3 className="text-2xl font-bold text-primary mb-6 flex items-center">
                        <Building className="mr-3 h-6 w-6" />
                        Professional Experience
                      </h3>
                      <div className="space-y-6">
                        {experiences.map((exp, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            className="border-l-2 border-primary/30 pl-6 relative"
                          >
                            <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-2"></div>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                              <h4 className="text-xl font-semibold text-foreground">{exp.title}</h4>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="mr-1 h-4 w-4" />
                                {exp.period}
                              </div>
                            </div>
                            <div className="flex items-center text-primary mb-3">
                              <Building className="mr-2 h-4 w-4" />
                              <span className="font-medium">{exp.company}</span>
                              <span className="mx-2">•</span>
                              <MapPin className="mr-1 h-4 w-4" />
                              <span>{exp.location}</span>
                            </div>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i}>{achievement}</li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Education Section */}
                    <motion.div variants={itemVariants}>
                      <h3 className="text-2xl font-bold text-primary mb-6 flex items-center">
                        <GraduationCap className="mr-3 h-6 w-6" />
                        Education
                      </h3>
                      <div className="space-y-6">
                        {education.map((edu, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            className="border-l-2 border-primary/30 pl-6 relative"
                          >
                            <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-2"></div>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                              <h4 className="text-xl font-semibold text-foreground">{edu.degree}</h4>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="mr-1 h-4 w-4" />
                                {edu.period}
                              </div>
                            </div>
                            <div className="flex items-center text-primary mb-2">
                              <GraduationCap className="mr-2 h-4 w-4" />
                              <span className="font-medium">{edu.school}</span>
                              <span className="mx-2">•</span>
                              <MapPin className="mr-1 h-4 w-4" />
                              <span>{edu.location}</span>
                            </div>
                            <p className="text-muted-foreground">{edu.details}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Quick Summary */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-primary/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Professional Summary
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Experienced Full Stack Developer with 4+ years of expertise in React, Node.js, 
                  and modern web technologies. Proven track record of delivering high-quality, 
                  scalable applications and leading development teams. Passionate about creating 
                  exceptional user experiences and staying up-to-date with the latest technologies.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;