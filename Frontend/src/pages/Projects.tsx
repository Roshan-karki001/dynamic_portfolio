"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, ExternalLink, Calendar, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import { APP_URL } from "@/utils/domain";

const fetchProjects = async () => {
  const res = await fetch(`${APP_URL}/api/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

const Projects = () => {
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

  const statuses = [
    { id: "all", label: "All", count: projects.length },
    {
      id: "completed",
      label: "Completed",
      count: projects.filter((p: any) => p.status === "completed").length,
    },
    {
      id: "in-progress",
      label: "In Progress",
      count: projects.filter((p: any) => p.status === "in-progress").length,
    },
    {
      id: "planning",
      label: "Planning",
      count: projects.filter((p: any) => p.status === "planning").length,
    },
  ];

  const filteredProjects =
    selectedStatus === "all"
      ? projects
      : projects.filter((p: any) => p.status === selectedStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "in-progress":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "planning":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-muted text-muted-foreground";
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
              A showcase of my projects. Filter them by status to see what I’ve
              completed, what I’m currently working on, and what’s in the
              pipeline.
            </p>
          </div>

          {/* Status Filter */}
          <Tabs
            value={selectedStatus}
            onValueChange={setSelectedStatus}
            className="mb-12"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 max-w-3xl mx-auto">
              {statuses.map((status) => (
                <TabsTrigger
                  key={status.id}
                  value={status.id}
                  className="text-xs lg:text-sm"
                >
                  {status.label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {status.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedStatus}>
              <div className="grid lg:grid-cols-2 gap-8">
                {filteredProjects.map((project: any) => (
                  <Card
                    key={project.id}
                    className="border-border/50 hover:border-success/50 transition-all duration-300 shadow-lg group"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                          {project.project_logo_path ? (
                            <img
                              src={project.project_logo_path}
                              alt={project.title}
                              className="h-12 w-12 object-contain"
                            />
                          ) : (
                            "📦"
                          )}
                        </div>

                        <Badge className={getStatusColor(project.status)}>
                          {project.status === "completed"
                            ? "Completed"
                            : project.status === "in-progress"
                            ? "In Progress"
                            : "Planning"}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-success">
                        {project.title}
                      </CardTitle>
                      <CardDescription
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={{
                          __html: project.description,
                        }}
                      />
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Project Details */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(project.date).getFullYear()}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {project.done_by}
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech_used?.map(
                          (tech: string, index: number) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          )
                        )}
                      </div>

                      {/* Highlights */}
                      {project.key_highlight?.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-2 text-success">
                            Key Highlights:
                          </h4>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {project.key_highlight.map(
                              (highlight: string, index: number) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-success mr-2">•</span>
                                  {highlight}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        {project.code_link && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            asChild
                          >
                            <a
                              href={project.code_link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="mr-2 h-4 w-4" />
                              Code
                            </a>
                          </Button>
                        )}
                        {project.demo_link &&
                          project.demo_link !== "#" && (
                            <Button
                              size="sm"
                              className="flex-1 bg-success hover:bg-success/90"
                              asChild
                            >
                              <a
                                href={project.demo_link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
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
                <h3 className="text-2xl font-semibold mb-4 text-success">
                  Want to see more?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Check out my GitHub profile for more projects, contributions,
                  and code samples.
                </p>
                <Button
                  className="bg-success hover:bg-success/90 text-success-foreground"
                  asChild
                >
                  <a
                    href="https://github.com/johndoe"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
