"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Award, Target, Coffee } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { APP_URL } from "@/utils/domain";
import Navigation from "@/components/Navigation";

const fetchData = async () => {
  const res = await fetch(`${APP_URL}/api/abouts`);
  if (!res.ok) throw new Error("Failed to fetch about data");
  return res.json();
};

const About = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["about"],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error fetching data</div>;
  }

  const about = data?.data?.[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-success to-success-glow bg-clip-text text-transparent">
              About Me
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get to know more about my journey, education, and what drives my passion for technology.
            </p>
          </div>

          {/* Personal Story */}
          {about?.story && (
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-success flex items-center">
                    <Coffee className="mr-2 h-6 w-6" />
                    My Story
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none">
                  {about.story.split("\n\n").map((para: string, idx: number) => (
                    <p key={idx} className="text-muted-foreground leading-relaxed mb-4">
                      {para}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Education */}
          {about?.education?.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-success flex items-center justify-center">
                <BookOpen className="mr-2 h-8 w-8" />
                Education
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {about.education.map((edu: any, index: number) => (
                  <Card key={index} className="border-border/50 hover:border-success/50 transition-all duration-300 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl text-success">{edu.degree}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {edu.university} • {new Date(edu.start_year).getFullYear()} -{" "}
                        {new Date(edu.end_year).getFullYear()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-3">
                        <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                          GPA: {edu.gpa}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{edu.short_description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {about?.achievements?.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-success flex items-center justify-center">
                <Award className="mr-2 h-8 w-8" />
                Achievements
              </h2>
              <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {about.achievements.map((achievement: string, index: number) => (
                  <div key={index} className="flex items-center p-4 bg-success/5 border border-success/20 rounded-lg">
                    <Award className="h-5 w-5 text-success mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {about?.interests_hobbies?.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-success flex items-center justify-center">
                <Target className="mr-2 h-8 w-8" />
                Interests & Hobbies
              </h2>
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {about.interests_hobbies.map((interest: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-success/10 text-success border-success/20 hover:bg-success/20 transition-colors"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto border-success/20 bg-success/5">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-4 text-success">Let's Connect!</h3>
                <p className="text-muted-foreground mb-6">
                  I'm always excited to meet new people and discuss technology, projects, or opportunities.
                </p>
                <Button className="bg-success hover:bg-success/90 text-success-foreground">
                  Get In Touch
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
