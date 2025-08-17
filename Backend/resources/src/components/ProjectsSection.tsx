import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce application with user authentication, product management, and payment integration.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "🛒",
      github: "#",
      demo: "#",
      featured: true
    },
    {
      title: "Task Management App",
      description: "A collaborative task management tool with real-time updates and team collaboration features.",
      tech: ["React", "Firebase", "Tailwind CSS"],
      image: "📋",
      github: "#",
      demo: "#",
      featured: true
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather application with location-based forecasts and interactive charts.",
      tech: ["JavaScript", "OpenWeather API", "Chart.js"],
      image: "🌤️",
      github: "#",
      demo: "#",
      featured: false
    },
    {
      title: "Portfolio Website",
      description: "A responsive personal portfolio website showcasing projects and skills.",
      tech: ["React", "Tailwind CSS", "Vite"],
      image: "💼",
      github: "#",
      demo: "#",
      featured: false
    },
    {
      title: "Chat Application",
      description: "Real-time chat application with multiple rooms and user authentication.",
      tech: ["Socket.io", "Node.js", "React", "MongoDB"],
      image: "💬",
      github: "#",
      demo: "#",
      featured: false
    },
    {
      title: "Blog Platform",
      description: "A full-featured blog platform with markdown support and comment system.",
      tech: ["Next.js", "PostgreSQL", "Prisma"],
      image: "📝",
      github: "#",
      demo: "#",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills 
            and passion for creating meaningful applications.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
              <CardHeader>
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  {project.image}
                </div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                  <Button size="sm" className="flex-1">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center text-primary">Other Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherProjects.map((project, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {project.image}
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.slice(0, 2).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tech.length - 2}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="flex-1 h-8">
                      <Github className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 h-8">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            <Github className="mr-2 h-5 w-5" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
