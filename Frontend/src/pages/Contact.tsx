import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Send, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { APP_URL } from "@/utils/domain";

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    work_email: "",
    subject: "",
    message: "",
  });

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "Karkiroshan061@gmail.com",
      description: "Best for detailed inquiries",
      link: "mailto:Karkiroshan061@gmail.com",
      available: "Usually responds within 24 hours",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "9843619861",
      description: "For urgent matters",
      available: "Available Mon-Fri 9AM-6PM EST",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Bhaktapur, Nepal",
      description: "Open to relocation",
      link: "#",
      available: "Available for in-person meetings",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      platform: "GitHub",
      username: "@RoshanKarki",
      link: "https://github.com/karkiroshan001",
      description: "Check out my code and projects",
    },
    {
      icon: Linkedin,
      platform: "LinkedIn",
      username: "Roshan Karki",
      link: "https://linkedin.com/in/RoshanKarki",
      description: "Professional networking and updates",
    },
    {
      icon: Twitter,
      platform: "Twitter",
      username: "@johndoe_dev",
      link: "https://twitter.com/johndoe_dev",
      description: "Tech thoughts and daily updates",
    },
  ];

  const collaborationTypes = [
    { type: "Internships", description: "Seeking summer 2024 opportunities", available: true },
    { type: "Freelance Projects", description: "Web development and mobile apps", available: true },
    { type: "Open Source", description: "Contributing to meaningful projects", available: true },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${APP_URL}/api/email-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Form submission error:", errorData);
        alert("Submission failed. Please check your inputs.");
        return;
      }

      alert("Message sent successfully!");

      setFormData({
        full_name: "",
        work_email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again later.");
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
              Let's Connect
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              I'm always excited to discuss new opportunities, collaborate on interesting projects,
              or simply chat about technology and innovation. Don't hesitate to reach out!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-success flex items-center">
                    <Send className="mr-2 h-6 w-6" />
                    Send Me a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">Full Name *</Label>
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
                        <Label htmlFor="work_email">Email Address *</Label>
                        <Input
                          id="work_email"
                          name="work_email"
                          type="email"
                          value={formData.work_email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project, opportunity, or just say hello!"
                        className="min-h-[150px]"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-success hover:bg-success/90 text-success-foreground">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information Sidebar */}
            <div className="space-y-6">
              {/* Contact Methods */}
              <Card className="border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-success">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-success/50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                          <method.icon className="h-5 w-5 text-success" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{method.title}</h4>
                          <p className="text-sm text-muted-foreground">{method.value}</p>
                          <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                          <Badge variant="secondary" className="mt-2 text-xs bg-success/10 text-success border-success/20">
                            {method.available}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-success">Social Media</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg border border-border/50 hover:border-success/50 transition-colors group"
                    >
                      <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center group-hover:bg-success/20 transition-colors">
                        <social.icon className="h-4 w-4 text-success" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{social.platform}</div>
                        <div className="text-xs text-muted-foreground">{social.username}</div>
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>

              {/* Availability */}
              <Card className="border-success/20 bg-success/5">
                <CardHeader>
                  <CardTitle className="text-xl text-success flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Current Availability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {collaborationTypes.map((collab, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{collab.type}</div>
                          <div className="text-xs text-muted-foreground">{collab.description}</div>
                        </div>
                        <Badge
                          className={
                            collab.available
                              ? "bg-success/20 text-success border-success/30"
                              : "bg-muted text-muted-foreground"
                          }
                        >
                          {collab.available ? "Available" : "Busy"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-success">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-success mb-2">What's your response time?</h3>
                  <p className="text-sm text-muted-foreground">
                    I typically respond to emails within 24 hours, and phone calls/texts during business hours.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-success mb-2">Are you available for internships?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! I'm actively seeking summer 2024 internship opportunities in software development.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-success mb-2">Do you take on freelance projects?</h3>
                  <p className="text-sm text-muted-foreground">
                    I'm open to small web development and mobile app projects that fit my schedule.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-success mb-2">Can we collaborate on open source?</h3>
                  <p className="text-sm text-muted-foreground">
                    Absolutely! I love contributing to meaningful open source projects and learning from others.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
