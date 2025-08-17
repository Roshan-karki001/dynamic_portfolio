import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, ExternalLink, Calendar, Users } from "lucide-react";
import Navigation from "@/components/Navigation";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const projects = [
    {
      id: 1,
      title: "EcoTracker - Sustainability App",
      description: "A mobile-first web application that helps users track their carbon footprint and suggests eco-friendly alternatives for daily activities.",
      longDescription: "EcoTracker is a comprehensive sustainability platform that combines data visualization, gamification, and social features to encourage environmental consciousness. Users can log their daily activities, see their environmental impact, and compete with friends in sustainability challenges.",
      image: "🌱",
      tech: ["React", "Node.js", "MongoDB", "Chart.js", "PWA"],
      category: "web",
      status: "completed",
      github: "https://github.com/johndoe/ecotracker",
      demo: "https://ecotracker-demo.com",
      date: "2024",
      team: "Solo Project",
      highlights: [
        "90% reduction in load time with optimized lazy loading",
        "Integration with 5+ environmental data APIs",
        "Progressive Web App with offline functionality",
        "10,000+ downloads in first month"
      ]
    },
    {
      id: 2,
      title: "SmartLibrary Management System",
      description: "A comprehensive library management system with features for book tracking, user management, and automated fine calculations.",
      longDescription: "This system modernizes traditional library operations by providing digital catalog management, real-time book availability tracking, automated notifications, and detailed analytics for library administrators.",
      image: "📚",
      tech: ["Java", "Spring Boot", "MySQL", "Thymeleaf", "Bootstrap"],
      category: "backend",
      status: "completed",
      github: "https://github.com/johndoe/smartlibrary",
      demo: "https://smartlibrary-demo.com",
      date: "2023",
      team: "Team of 3",
      highlights: [
        "Reduced check-out time by 60%",
        "Automated fine calculation system",
        "QR code integration for quick book scanning",
        "Used by 2 local libraries"
      ]
    },
    {
      id: 3,
      title: "CryptoPortfolio Tracker",
      description: "A real-time cryptocurrency portfolio tracking application with advanced analytics and price alerts.",
      longDescription: "This application provides comprehensive cryptocurrency portfolio management with real-time price updates, profit/loss calculations, market trend analysis, and customizable alerts for price movements.",
      image: "₿",
      tech: ["React", "TypeScript", "Redux", "WebSockets", "CoinGecko API"],
      category: "web",
      status: "in-progress",
      github: "https://github.com/johndoe/cryptoportfolio",
      demo: "https://crypto-portfolio-demo.com",
      date: "2024",
      team: "Solo Project",
      highlights: [
        "Real-time price updates via WebSockets",
        "Support for 1000+ cryptocurrencies",
        "Advanced charting with TradingView widgets",
        "Custom alert system"
      ]
    },
    {
      id: 4,
      title: "AI Study Buddy",
      description: "An AI-powered study assistant that creates personalized study plans and quizzes based on uploaded course materials.",
      longDescription: "This application uses natural language processing to analyze study materials and create customized learning experiences. It generates practice questions, provides explanations, and adapts to individual learning patterns.",
      image: "🤖",
      tech: ["Python", "FastAPI", "OpenAI API", "React", "PostgreSQL"],
      category: "ai",
      status: "in-progress",
      github: "https://github.com/johndoe/ai-study-buddy",
      demo: "#",
      date: "2024",
      team: "Team of 2",
      highlights: [
        "AI-generated study questions",
        "Personalized learning recommendations",
        "Progress tracking and analytics",
        "Support for multiple file formats"
      ]
    },
    {
      id: 5,
      title: "FitTrack Mobile App",
      description: "A React Native fitness tracking application with workout logging, progress visualization, and social features.",
      longDescription: "FitTrack helps users maintain their fitness journey by providing comprehensive workout tracking, progress monitoring, and community features to keep users motivated and engaged.",
      image: "💪",
      tech: ["React Native", "Firebase", "Expo", "Redux Toolkit"],
      category: "mobile",
      status: "completed",
      github: "https://github.com/johndoe/fittrack",
      demo: "https://fittrack-app.com",
      date: "2023",
      team: "Solo Project",
      highlights: [
        "Cross-platform mobile application",
        "Offline workout logging capability",
        "Social features and challenges",
        "Integration with wearable devices"
      ]
    },
    {
      id: 6,
      title: "CloudDeploy CLI Tool",
      description: "A command-line interface tool for simplified deployment to multiple cloud platforms with one command.",
      longDescription: "This tool streamlines the deployment process by providing a unified interface for deploying applications to AWS, Google Cloud, and Azure. It includes configuration management, rollback capabilities, and deployment monitoring.",
      image: "☁️",
      tech: ["Go", "Docker", "AWS CLI", "Cobra", "YAML"],
      category: "tools",
      status: "completed",
      github: "https://github.com/johndoe/clouddeploy-cli",
      demo: "#",
      date: "2024",
      team: "Solo Project",
      highlights: [
        "Multi-cloud deployment support",
        "Zero-downtime deployment strategies",
        "Automated rollback on failure",
        "Configuration validation"
      ]
    }
  ];

  const categories = [
    { id: "all", label: "All Projects", count: projects.length },
    { id: "web", label: "Web Apps", count: projects.filter(p => p.category === "web").length },
    { id: "mobile", label: "Mobile Apps", count: projects.filter(p => p.category === "mobile").length },
    { id: "backend", label: "Backend", count: projects.filter(p => p.category === "backend").length },
    { id: "ai", label: "AI/ML", count: projects.filter(p => p.category === "ai").length },
    { id: "tools", label: "Tools", count: projects.filter(p => p.category === "tools").length }
  ];

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success/10 text-success border-success/20";
      case "in-progress": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-success to-success-glow bg-clip-text text-transparent">
              My Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A showcase of my development projects, from web applications to mobile apps 
              and everything in between. Each project represents a learning journey and problem-solving adventure.
            </p>
          </div>

          {/* Category Filter */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 max-w-4xl mx-auto">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs lg:text-sm">
                  {category.label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory}>
              <div className="grid lg:grid-cols-2 gap-8">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="border-border/50 hover:border-success/50 transition-all duration-300 shadow-lg group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                          {project.image}
                        </div>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status === "completed" ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-success">{project.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.longDescription}
                      </p>
                      
                      {/* Project Details */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {project.date}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {project.team}
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Highlights */}
                      <div>
                        <h4 className="font-medium text-sm mb-2 text-success">Key Highlights:</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {project.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-success mr-2">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </Button>
                        {project.demo !== "#" && (
                          <Button size="sm" className="flex-1 bg-success hover:bg-success/90" asChild>
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto border-success/20 bg-success/5">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-4 text-success">Want to see more?</h3>
                <p className="text-muted-foreground mb-6">
                  Check out my GitHub profile for more projects, contributions, and code samples.
                </p>
                <Button className="bg-success hover:bg-success/90 text-success-foreground" asChild>
                  <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    View All Projects on GitHub
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;