import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ProjectsSection = () => {
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
        damping: 15
      }
    }
  };

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include real-time inventory, advanced search, and responsive design.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.com",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "/api/placeholder/600/400",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Socket.io"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.com",
      featured: true
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "An interactive weather dashboard with beautiful visualizations, location-based forecasts, and historical weather data analysis.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Chart.js", "OpenWeather API", "Material-UI"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.com",
      featured: false
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A stunning 3D portfolio website with interactive animations, particle effects, and smooth page transitions using modern web technologies.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.com",
      featured: false
    },
    {
      id: 5,
      title: "Social Media Analytics",
      description: "A comprehensive analytics dashboard for social media performance tracking with real-time data visualization and reporting features.",
      image: "/api/placeholder/600/400",
      technologies: ["Vue.js", "D3.js", "Express.js", "Redis", "Chart.js"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.com",
      featured: false
    },
    {
      id: 6,
      title: "AI Chat Application",
      description: "An intelligent chat application powered by AI with natural language processing, context awareness, and multi-language support.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Python", "OpenAI API", "WebSocket", "Docker"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.com",
      featured: false
    }
  ];

  const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -10 }}
      transition={{ type: "spring" as const, stiffness: 300 }}
      className={`group ${project.featured ? 'md:col-span-2' : ''}`}
    >
      <Card className="glass-card border-0 h-full overflow-hidden card-3d">
        <div className="relative">
          <div className="aspect-video bg-gradient-secondary rounded-t-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-primary opacity-20 flex items-center justify-center">
              <Eye className="h-16 w-16 text-white/50" />
            </div>
          </div>
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              asChild
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                Code
              </a>
            </Button>
            <Button
              size="sm"
              className="bg-primary/80 hover:bg-primary text-white"
              asChild
            >
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </a>
            </Button>
          </div>
        </div>

        <CardHeader>
          <CardTitle className="text-xl font-bold group-hover:gradient-text transition-all duration-300">
            {project.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A collection of projects that showcase my expertise in modern web development, 
              from concept to deployment.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* View More Button */}
          <motion.div 
            className="text-center mt-16"
            variants={itemVariants}
          >
            <Button
              size="lg"
              variant="outline"
              className="glass-card border-primary/30 hover:bg-primary/10 transition-all duration-300"
              asChild
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                View More on GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;