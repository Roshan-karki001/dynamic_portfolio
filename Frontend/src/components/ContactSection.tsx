import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";
import { APP_URL } from "@/utils/domain";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${APP_URL}/api/email-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Form submission error:", errorData);
        alert("Submission failed. Please check your inputs.");
        return;
      }

      alert("Message sent successfully!");
      setFormData({ full_name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "Karkiroshan061@gmail.com",
      link: "mailto:Karkiroshan061@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "9843619862",
      link: "tel:+9779843619862",
    },
    { icon: MapPin, title: "Location", value: "Bhaktapur, Nepal", link: "#" },
  ];

  const socialLinks = [
    {
      icon: Github,
      title: "GitHub",
      value: "@RoshanKarki",
      link: "https://github.com/RoshanKarki",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "Roshan Karki",
      link: "https://linkedin.com/in/roshan-karki",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm always open to discussing new opportunities, interesting
            projects, or just having a conversation about technology. Feel free
            to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">
                Send a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="Fullname">Full Name</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Roshan@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project collaboration"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or just say hello!"
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full flex items-center justify-center"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center space-x-4 p-4 bg-card/50 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-muted-foreground">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                Follow Me
              </h3>
              <div className="space-y-4">
                {socialLinks.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center space-x-4 p-4 bg-card/50 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-muted-foreground">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
              <h4 className="font-semibold mb-2 text-primary">
                Looking for opportunities?
              </h4>
              <p className="text-muted-foreground mb-4">
                I'm currently seeking internship opportunities and entry-level
                positions in software development, web development, or IT
                support roles.
              </p>
              <Button variant="outline">Download Resume</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
