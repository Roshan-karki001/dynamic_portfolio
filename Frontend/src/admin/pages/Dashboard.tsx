import React from 'react';
import { 
  Users, 
  FolderOpen, 
  MessageSquare, 
  TrendingUp,
  Eye,
  Download
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Projects',
      value: 12,
      change: '+2.5% from last month',
      changeType: 'positive' as const,
      icon: FolderOpen
    },
    {
      title: 'Messages',
      value: 48,
      change: '+12% from last week',
      changeType: 'positive' as const,
      icon: MessageSquare
    },
    {
      title: 'Profile Views',
      value: 1250,
      change: '+8% from last month',
      changeType: 'positive' as const,
      icon: Eye
    },
    {
      title: 'Total Users',
      value: 342,
      change: '+5.2% from last month',
      changeType: 'positive' as const,
      icon: Users
    }
  ];

  const recentProjects = [
    { id: 1, name: 'E-commerce Platform', status: 'Completed', date: '2024-01-15' },
    { id: 2, name: 'Portfolio Website', status: 'In Progress', date: '2024-02-10' },
    { id: 3, name: 'Mobile App', status: 'Planning', date: '2024-03-01' }
  ];

  const recentMessages = [
    { id: 1, sender: 'John Smith', subject: 'Project Inquiry', time: '2 hours ago' },
    { id: 2, sender: 'Sarah Johnson', subject: 'Collaboration', time: '4 hours ago' },
    { id: 3, sender: 'Mike Wilson', subject: 'Job Opportunity', time: '1 day ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your portfolio.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FolderOpen className="w-5 h-5 mr-2" />
              Recent Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{project.name}</p>
                    <p className="text-sm text-gray-500">{project.date}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Recent Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{message.sender}</p>
                    <p className="text-sm text-gray-600">{message.subject}</p>
                  </div>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-24 flex flex-col">
              <FolderOpen className="w-6 h-6 mb-2" />
              Add New Project
            </Button>
            <Button variant="outline" className="h-24 flex flex-col">
              <MessageSquare className="w-6 h-6 mb-2" />
              View Messages
            </Button>
            <Button variant="outline" className="h-24 flex flex-col">
              <TrendingUp className="w-6 h-6 mb-2" />
              Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;