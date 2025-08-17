import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "JavaScript", level: 85 },
        { name: "Python", level: 80 },
        { name: "Java", level: 75 },
        { name: "C++", level: 70 },
        { name: "TypeScript", level: 75 }
      ]
    },
    {
      title: "Web Technologies",
      skills: [
        { name: "React", level: 80 },
        { name: "Node.js", level: 75 },
        { name: "HTML/CSS", level: 90 },
        { name: "MongoDB", level: 70 },
        { name: "PostgreSQL", level: 65 }
      ]
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Git", level: 85 },
        { name: "Docker", level: 60 },
        { name: "AWS", level: 55 },
        { name: "Linux", level: 70 },
        { name: "VS Code", level: 95 }
      ]
    }
  ];

  const technologies = [
    "React", "Node.js", "Python", "JavaScript", "TypeScript", "MongoDB", 
    "PostgreSQL", "Docker", "Git", "AWS", "Linux", "Java", "C++", 
    "Express.js", "Tailwind CSS", "Firebase", "REST APIs", "GraphQL"
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Here are the technologies and tools I work with regularly, 
            along with my proficiency levels in each area.
          </p>
        </div>

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

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-8 text-primary">Technology Stack</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
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