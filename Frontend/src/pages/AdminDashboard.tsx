import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Users, FolderOpen, MessageSquare, Settings, Download, Plus, Edit, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const [stats] = useState({
    totalProjects: 12,
    totalContacts: 48,
    totalSkills: 15,
    profileViews: 1250
  });

  const [projects] = useState([
    { id: 1, title: "E-commerce Platform", status: "Completed", tech: ["React", "Node.js"], date: "2024-01-15" },
    { id: 2, title: "Portfolio Website", status: "In Progress", tech: ["React", "Tailwind"], date: "2024-02-10" },
    { id: 3, title: "Mobile App", status: "Planning", tech: ["React Native", "Firebase"], date: "2024-03-01" }
  ]);

  const [contacts] = useState([
    { id: 1, name: "John Smith", email: "john@company.com", subject: "Project Inquiry", date: "2024-02-15", status: "Unread" },
    { id: 2, name: "Sarah Johnson", email: "sarah@startup.com", subject: "Collaboration", date: "2024-02-14", status: "Read" },
    { id: 3, name: "Mike Wilson", email: "mike@tech.com", subject: "Job Opportunity", date: "2024-02-13", status: "Replied" }
  ]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your portfolio content and settings</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Generate CV PDF
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalProjects}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalContacts}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skills Listed</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalSkills}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.profileViews}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Project Management</CardTitle>
                  <CardDescription>Manage your portfolio projects</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{project.title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={project.status === 'Completed' ? 'default' : 
                                       project.status === 'In Progress' ? 'secondary' : 'outline'}>
                            {project.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{project.date}</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          {project.tech.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Contact Management</CardTitle>
                <CardDescription>Manage contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{contact.name}</h3>
                          <Badge variant={contact.status === 'Unread' ? 'destructive' : 
                                       contact.status === 'Read' ? 'secondary' : 'default'}>
                            {contact.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                        <p className="text-sm font-medium mt-1">{contact.subject}</p>
                        <p className="text-xs text-muted-foreground">{contact.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Reply</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Skills Management</CardTitle>
                  <CardDescription>Manage your technical skills and proficiency levels</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'].map((skill) => (
                    <div key={skill} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium text-foreground">{skill}</span>
                        <div className="w-32 bg-secondary rounded-full h-2 mt-2">
                          <div className="bg-primary h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <input className="w-full p-2 border rounded-md mt-1" defaultValue="John Doe" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <input className="w-full p-2 border rounded-md mt-1" defaultValue="john@example.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Phone</label>
                      <input className="w-full p-2 border rounded-md mt-1" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Location</label>
                      <input className="w-full p-2 border rounded-md mt-1" defaultValue="San Francisco, CA" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Bio</label>
                    <textarea className="w-full p-2 border rounded-md mt-1 h-24" 
                              defaultValue="Passionate IT student with experience in web development..." />
                  </div>
                  <div className="flex gap-4">
                    <Button>Save Changes</Button>
                    <Button variant="outline">Reset</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;