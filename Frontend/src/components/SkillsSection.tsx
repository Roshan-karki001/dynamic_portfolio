import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code, Database, Cloud, Monitor, Server, Wrench } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { APP_URL } from "@/utils/domain";

// Fetch skills and tools from backend
const fetchSkills = async () => {
  const res = await fetch(`${APP_URL}/api/skill_experties`);
  if (!res.ok) throw new Error("Failed to fetch skills data");
  return res.json();
};

// Map backend title_icon to Lucide icons
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

const SkillsSection = () => {
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
  const toolsData = data?.data?.tools?.[0] || { tools: [], currently_learning: [] };

  // Map skill data for progress bar and display
  const mappedSkills = skills.map(s => ({
    name: s.skill_name,
    level: levelMap[s.level] || 0,
    title: s.title,
    icon: titleIconMap[s.title_icon],
    skill_icon_path: s.skill_icon_path,
  }));

  // Group skills by title/category
  const groupedSkills = mappedSkills.reduce((acc, skill) => {
    if (!acc[skill.title]) acc[skill.title] = [];
    acc[skill.title].push(skill);
    return acc;
  }, {});

  const skillCategories = Object.keys(groupedSkills).map(title => ({
    title,
    skills: groupedSkills[title],
  }));

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Here are the technologies and tools I work with regularly, 
            along with my proficiency levels in each area.
          </p>
        </div>

        {/* Skill Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-center text-primary">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tools Badges */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-8 text-primary">Technology Stack</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {toolsData.tools.map((tech, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
