import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Cloud, Shield, Smartphone, Palette } from "lucide-react";
import Navigation from "@/components/Navigation";

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: [
        { name: "JavaScript", level: 90, color: "bg-yellow-500" },
        { name: "Python", level: 85, color: "bg-blue-500" },
        { name: "TypeScript", level: 80, color: "bg-blue-600" },
        { name: "Java", level: 75, color: "bg-red-500" },
        { name: "C++", level: 70, color: "bg-purple-500" },
        { name: "SQL", level: 85, color: "bg-green-500" }
      ]
    },
    {
      title: "Frontend Development",
      icon: Palette,
      skills: [
        { name: "React", level: 88, color: "bg-cyan-500" },
        { name: "HTML/CSS", level: 95, color: "bg-orange-500" },
        { name: "Tailwind CSS", level: 90, color: "bg-teal-500" },
        { name: "Vue.js", level: 65, color: "bg-green-600" },
        { name: "SASS/SCSS", level: 80, color: "bg-pink-500" }
      ]
    },
    {
      title: "Backend Development",
      icon: Database,
      skills: [
        { name: "Node.js", level: 82, color: "bg-green-600" },
        { name: "Express.js", level: 80, color: "bg-gray-600" },
        { name: "MongoDB", level: 75, color: "bg-green-500" },
        { name: "PostgreSQL", level: 70, color: "bg-blue-600" },
        { name: "REST APIs", level: 85, color: "bg-indigo-500" }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      skills: [
        { name: "AWS", level: 60, color: "bg-orange-600" },
        { name: "Docker", level: 65, color: "bg-blue-500" },
        { name: "Git", level: 90, color: "bg-red-600" },
        { name: "CI/CD", level: 55, color: "bg-purple-600" },
        { name: "Linux", level: 75, color: "bg-yellow-600" }
      ]
    },
    {
      title: "Mobile Development",
      icon: Smartphone,
      skills: [
        { name: "React Native", level: 70, color: "bg-cyan-600" },
        { name: "Flutter", level: 60, color: "bg-blue-400" },
        { name: "Android Studio", level: 65, color: "bg-green-500" }
      ]
    },
    {
      title: "Security & Testing",
      icon: Shield,
      skills: [
        { name: "Jest", level: 75, color: "bg-red-500" },
        { name: "Cypress", level: 65, color: "bg-gray-700" },
        { name: "OWASP", level: 60, color: "bg-red-600" },
        { name: "Unit Testing", level: 80, color: "bg-green-600" }
      ]
    }
  ];

  const certifications = [
    "AWS Cloud Practitioner",
    "Google Analytics Certified",
    "MongoDB Developer Associate",
    "Scrum Fundamentals Certified"
  ];

  const tools = [
    "VS Code", "IntelliJ IDEA", "Postman", "Figma", "Adobe XD", 
    "Jira", "Slack", "Notion", "GitHub", "GitLab", "Vercel", "Netlify"
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
              A comprehensive overview of my technical skills, tools, and certifications 
              that I've developed throughout my journey.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, index) => (
              <Card key={index} className="border-border/50 hover:border-success/50 transition-all duration-300 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-success flex items-center">
                    <category.icon className="mr-2 h-6 w-6" />
                    {category.title}
                  </CardTitle>
                  <CardDescription>
                    My proficiency levels in {category.title.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={skill.level} className="h-3" />
                        <div 
                          className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-1000 ${skill.color} opacity-80`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Certifications */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-success">
              Certifications
            </h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {certifications.map((cert, index) => (
                <Card key={index} className="border-success/20 bg-success/5 hover:bg-success/10 transition-colors">
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
              {tools.map((tool, index) => (
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
          <div className="mt-16">
            <Card className="max-w-3xl mx-auto border-success/20 bg-success/5">
              <CardHeader>
                <CardTitle className="text-2xl text-success text-center">Currently Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <h4 className="font-semibold text-success mb-2">AI/ML</h4>
                    <p className="text-sm text-muted-foreground">TensorFlow, PyTorch</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-success mb-2">DevOps</h4>
                    <p className="text-sm text-muted-foreground">Kubernetes, Terraform</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-success mb-2">Blockchain</h4>
                    <p className="text-sm text-muted-foreground">Solidity, Web3.js</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;