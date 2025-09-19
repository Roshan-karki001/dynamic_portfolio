import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Code2, 
  Globe, 
  Cloud, 
  Database, 
  Smartphone,
  Brain,
  Award,
  Wrench,
  BookOpen,
  Star
} from "lucide-react";

const SkillsSection = () => {
  const skillLevels = {
    "Beginner": { emoji: "🔰", description: "Just started learning, still exploring core concepts." },
    "Junior Developer": { emoji: "🧪", description: "Can build simple components, understand basics, uses tutorials often." },
    "Intermediate": { emoji: "🔧", description: "Comfortable building apps with routing, hooks, and component structure." },
    "Advanced": { emoji: "⚙️", description: "Can manage complex state, write custom solutions, optimize performance." },
    "Proficient": { emoji: "🧠", description: "Understands deeply, uses patterns, tests components, can mentor." },
    "Expert": { emoji: "🚀", description: "Mastery level with extensive experience and leadership capabilities." }
  };

  // Dummy data matching your backend structure
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code2,
      skills: [
        { name: "JavaScript", level: "Proficient", skill_icon: "⚡" },
        { name: "Python", level: "Advanced", skill_icon: "🐍" },
        { name: "Java", level: "Intermediate", skill_icon: "☕" },
        { name: "C++", level: "Intermediate", skill_icon: "⚙️" },
        { name: "TypeScript", level: "Advanced", skill_icon: "🔷" }
      ]
    },
    {
      title: "Frontend Development",
      icon: Globe,
      skills: [
        { name: "React", level: "Advanced", skill_icon: "⚛️" },
        { name: "Vue.js", level: "Intermediate", skill_icon: "💚" },
        { name: "HTML/CSS", level: "Expert", skill_icon: "🎨" },
        { name: "Tailwind CSS", level: "Advanced", skill_icon: "🌊" },
        { name: "Next.js", level: "Intermediate", skill_icon: "▲" }
      ]
    },
    {
      title: "Backend Development",
      icon: Database,
      skills: [
        { name: "Node.js", level: "Advanced", skill_icon: "🟢" },
        { name: "Express.js", level: "Advanced", skill_icon: "🚀" },
        { name: "MongoDB", level: "Intermediate", skill_icon: "🍃" },
        { name: "PostgreSQL", level: "Intermediate", skill_icon: "🐘" },
        { name: "REST APIs", level: "Advanced", skill_icon: "🔗" }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      skills: [
        { name: "AWS", level: "Junior Developer", skill_icon: "☁️" },
        { name: "Docker", level: "Intermediate", skill_icon: "🐳" },
        { name: "Git", level: "Proficient", skill_icon: "📝" },
        { name: "CI/CD", level: "Beginner", skill_icon: "🔄" },
        { name: "Linux", level: "Intermediate", skill_icon: "🐧" }
      ]
    },
    {
      title: "Mobile Development",
      icon: Smartphone,
      skills: [
        { name: "React Native", level: "Intermediate", skill_icon: "📱" },
        { name: "Flutter", level: "Beginner", skill_icon: "🦋" },
        { name: "iOS Development", level: "Beginner", skill_icon: "🍎" }
      ]
    },
    {
      title: "AI & Machine Learning",
      icon: Brain,
      skills: [
        { name: "TensorFlow", level: "Beginner", skill_icon: "🧠" },
        { name: "PyTorch", level: "Beginner", skill_icon: "🔥" },
        { name: "OpenAI API", level: "Intermediate", skill_icon: "🤖" }
      ]
    }
  ];

  const certifications = [
    {
      title: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2023",
    },
    {
      title: "React Developer Certification",
      issuer: "Meta",
      date: "2022",
    },
    {
      title: "Full Stack Web Development",
      issuer: "FreeCodeCamp",
      date: "2021",
    }
  ];

  const tools = [{
   GitBranch,}
  ];

  const currentlyLearning = [
    {
      title: "WebAssembly",
      description: "Exploring high-performance web applications with WASM"
    },
    {
      title: "Rust Programming",
      description: "Learning systems programming and memory safety concepts"
    },
    {
      title: "Kubernetes",
      description: "Container orchestration and cloud-native deployment strategies"
    },
    {
      title: "GraphQL",
      description: "Modern API design and efficient data fetching patterns"
    }
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

        {/* Skills Categories */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-primary">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.skills.map((skill, skillIndex) => {
                    const levelInfo = skillLevels[skill.level];
                    return (
                      <div key={skillIndex} className="p-3 rounded-lg bg-muted/30 border border-border/20 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xl">{skill.skill_icon}</span>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-sm">{skill.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {skill.level}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-8">
                          <span className="text-lg">{levelInfo.emoji}</span>
                          <p className="text-xs text-muted-foreground">{levelInfo.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 text-primary flex items-center justify-center gap-3">
            <Award className="w-8 h-8" />
            Certifications
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{cert.badge}</div>
                  <h4 className="font-semibold text-lg mb-2">{cert.title}</h4>
                  <p className="text-muted-foreground text-sm mb-2">{cert.issuer}</p>
                  <Badge variant="secondary">{cert.date}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tools & Software */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 text-primary flex items-center justify-center gap-3">
            <Wrench className="w-8 h-8" />
            Tools & Software
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((tool, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-md">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{tool}</div>
                  
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Currently Learning */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 text-primary flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8" />
            Currently Learning
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {currentlyLearning.map((item, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;