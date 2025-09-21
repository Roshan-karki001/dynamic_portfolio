import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Database,
  Cloud,
  Shield,
  Smartphone,
  Palette,
  Monitor,
  Server,
  Wrench,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { APP_URL } from "@/utils/domain";

// Map backend title_icon to actual icon components
const titleIconMap = {
  monitor: Monitor,
  server: Server,
  "code-2": Code,
  database: Database,
  cloud: Cloud,
  wrench: Wrench,
};

// Map skill levels to numeric values for progress bar
const levelMap = {
  beginner: 10,
  junior_developer: 30,
  intermediate: 50,
  advanced: 70,
  proficient: 85,
  expert: 100,
};

const fetchSkills = async () => {
  const res = await fetch(`${APP_URL}/api/skill_experties`);
  if (!res.ok) throw new Error("Failed to fetch skills data");
  return res.json();
};

const Skills = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error fetching data
      </div>
    );

  const skills = data?.data?.skills || [];
  const toolsData = data?.data?.tools?.[0] || {
    tools: [],
    currently_learning: [],
  };

  // Group skills by title
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.title]) acc[skill.title] = [];
    acc[skill.title].push(skill);
    return acc;
  }, {});

  const certifications = [
    "AWS Cloud Practitioner",
    "Google Analytics Certified",
    "MongoDB Developer Associate",
    "Scrum Fundamentals Certified",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-success to-success-glow bg-clip-text text-transparent">
              Skills & Expertise
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive overview of my technical skills, tools, and
              certifications that I've developed throughout my journey.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {Object.keys(groupedSkills).map((title, index) => {
              const Icon =
                titleIconMap[groupedSkills[title][0]?.title_icon] || Code;

              return (
                <Card
                  key={index}
                  className="border-border/50 hover:border-success/50 transition-all duration-300 shadow-lg"
                >
                  <CardHeader>
                    <CardTitle className="text-xl text-success flex items-center">
                      <Icon className="mr-2 h-6 w-6" />
                      {title.charAt(0).toUpperCase() +
                        title.slice(1).replace("_", " ")}
                    </CardTitle>
                    <CardDescription>
                      My proficiency levels in {title.replace("_", " ")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {groupedSkills[title].map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            {skill.skill_icon_url && (
                              <img
                                src={skill.skill_icon_url}
                                alt={skill.skill_name}
                                className="w-6 h-6 object-contain"
                                onError={(e) =>
                                  (e.currentTarget.style.display = "none")
                                } // fallback if broken
                              />
                            )}
                            <span className="text-sm font-medium">
                              {skill.skill_name} ({skill.level})
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {levelMap[skill.level]}%
                          </span>
                        </div>
                        <Progress
                          value={levelMap[skill.level]}
                          className="h-3"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Certifications */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-success">
              Certifications
            </h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {certifications.map((cert, index) => (
                <Card
                  key={index}
                  className="border-success/20 bg-success/5 hover:bg-success/10 transition-colors"
                >
                  <CardContent className="flex items-center p-4">
                    <Shield className="h-6 w-6 text-success mr-3" />
                    <span className="font-medium">{cert}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8 text-success">
              Tools & Technologies
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {toolsData.tools?.map((tool, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-4 py-2 text-sm bg-muted hover:bg-success/10 hover:text-success hover:border-success/20 transition-colors cursor-default"
                >
                  {tool}
                </Badge>
              ))}
            </div>
          </div>

          {/* Learning Goals */}
          {toolsData.currently_learning?.length > 0 && (
            <div className="mt-16">
              <Card className="max-w-3xl mx-auto border-success/20 bg-success/5">
                <CardHeader>
                  <CardTitle className="text-2xl text-success text-center">
                    Currently Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    {toolsData.currently_learning.map((item, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-success mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;
