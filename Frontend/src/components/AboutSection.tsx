import { Code, Lightbulb, Users, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AboutSection = () => {
  const highlights = [
    {
      icon: Code,
      title: "Programming Enthusiast",
      description: "Passionate about clean code and modern development practices"
    },
    {
      icon: Lightbulb,
      title: "Problem Solver",
      description: "Love tackling complex challenges with creative solutions"
    },
    {
      icon: Users,
      title: "Team Player",
      description: "Excellent communication and collaboration skills"
    },
    {
      icon: Zap,
      title: "Quick Learner",
      description: "Always eager to explore new technologies and frameworks"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a dedicated IT student with a passion for technology and innovation. 
            My journey in computer science has equipped me with strong fundamentals 
            in programming, system design, and problem-solving.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <Card 
              key={index} 
              className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4 text-primary">My Journey</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Currently in my final year of IT studies, I've developed a strong foundation in 
              software development, database management, and system administration. I enjoy 
              working on both frontend and backend projects, with a particular interest in 
              modern web technologies and cloud computing. When I'm not coding, you can find 
              me exploring new frameworks, contributing to open-source projects, or mentoring 
              fellow students.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;