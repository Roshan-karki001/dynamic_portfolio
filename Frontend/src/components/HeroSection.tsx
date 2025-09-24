import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { APP_URL } from "@/utils/domain";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/background.jpeg"
          alt="Modern workspace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/95"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 min-h-screen flex items-center relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="animate-fade-in text-center lg:text-left">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                👋 Welcome to my portfolio
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Roshan Karki
            </h1>

            <div className="text-2xl md:text-3xl text-muted-foreground mb-6">
              IT Student &{" "}
              <span className="text-primary font-semibold">Future Developer</span>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Passionate about technology, coding, and creating innovative
              solutions. Currently pursuing my degree in Information Technology
              with hands-on experience in modern web development frameworks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
              <Button
                onClick={() => navigate("/contact")}
                size="lg"
                className="animate-glow group"
              >
                <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Get In Touch
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group"
                onClick={() => {
                  window.location.href = `${APP_URL}/download-resume`;
                }}
              >
                <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Download Resume
              </Button>
            </div>

            <div className="flex justify-center lg:justify-start gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-all hover:bg-primary/10"
              >
                <Github className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-all hover:bg-primary/10"
              >
                <Linkedin className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-all hover:bg-primary/10"
              >
                <Mail className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-primary-glow/20 rounded-full blur-3xl"></div>

              {/* Profile Image Container */}
              <div className="relative bg-gradient-to-br from-card via-card to-muted/50 p-8 rounded-3xl shadow-2xl backdrop-blur-sm border border-border/50">
                <div className="relative">
                  <img
                    src="/profilepic.jpg"
                    alt="Roshan Karki - IT Student"
                    className="w-80 h-80 object-cover rounded-2xl shadow-xl"
                  />

                  {/* Status Indicator */}
                  <div className="absolute bottom-4 right-4 bg-green-500 w-6 h-6 rounded-full border-4 border-card animate-pulse"></div>

                  {/* Floating Tech Icons */}
                  <div className="absolute -top-6 -right-6 bg-primary/10 backdrop-blur-sm p-3 rounded-xl border border-primary/20 animate-float">
                    <div className="text-primary font-mono text-sm">{'</>'}</div>
                  </div>

                  <div
                    className="absolute -bottom-6 -left-6 bg-primary-glow/10 backdrop-blur-sm p-3 rounded-xl border border-primary-glow/20 animate-float"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="text-primary-glow font-mono text-sm">{'{ }'}</div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">3+</div>
                    <div className="text-xs text-muted-foreground">months Learning</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">3+</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">5+</div>
                    <div className="text-xs text-muted-foreground">Technologies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm">Scroll to explore</span>
          <ArrowDown className="h-5 w-5" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
