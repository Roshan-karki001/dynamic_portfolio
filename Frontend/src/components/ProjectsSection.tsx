import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { APP_URL } from "@/utils/domain";

const fetchProjects = async () => {
  const res = await fetch(`${APP_URL}/api/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

const ProjectsSection = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error fetching projects
      </div>
    );
  }

  const projects = data?.data || [];

  // First 2 projects as featured
  const featuredProjects = projects.slice(0, 2);
  // Next 4 projects as other
  const otherProjects = projects.slice(2, 6);

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
                <div className="text-6xl mb-4 group-hover:scale-105 transition-transform">
                  <img src={project.project_logo_path} alt={project.title} className="w-16 h-16" />
                </div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  <div dangerouslySetInnerHTML={{ __html: project.description }} />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech_used.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a href={project.code_link} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                  </a>
                  <a href={project.demo_link} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button size="sm" className="w-full">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </Button>
                  </a>
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
                    <img src={project.project_logo_path} alt={project.title} className="w-12 h-12" />
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                    <div dangerouslySetInnerHTML={{ __html: project.description }} />
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech_used.slice(0, 2).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech_used.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tech_used.length - 2}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <a href={project.code_link} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full h-8">
                        <Github className="h-3 w-3" />
                      </Button>
                    </a>
                    <a href={project.demo_link} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full h-8">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg">
              <Github className="mr-2 h-5 w-5" />
              View All Projects on GitHub
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
