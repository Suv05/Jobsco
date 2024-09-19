import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Briefcase, Users, BarChart2, MessageSquare, Bell, Search, Plus } from 'lucide-react';

export default function RecruiterDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Briefcase className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-2xl font-bold text-gray-900">JobPortal</span>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar className="ml-4">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">Welcome back, John Doe</p>
        </div>

        {/* Quick actions */}
        <div className="mb-8 flex space-x-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Post New Job
          </Button>
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" /> Search Candidates
          </Button>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Briefcase} title="Active Jobs" value="12" change="+2" />
          <StatCard icon={Users} title="Total Applicants" value="143" change="+28" />
          <StatCard icon={BarChart2} title="Interview Scheduled" value="8" />
          <StatCard icon={MessageSquare} title="Unread Messages" value="24" change="+5" />
        </div>

        {/* Recent job postings */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Job Postings</CardTitle>
            <CardDescription>Your most recent job listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <JobListing 
                title="Senior React Developer"
                department="Engineering"
                location="Remote"
                applicants={23}
                daysAgo={2}
              />
              <JobListing 
                title="UX Designer"
                department="Design"
                location="New York, NY"
                applicants={15}
                daysAgo={4}
              />
              <JobListing 
                title="Product Manager"
                department="Product"
                location="San Francisco, CA"
                applicants={31}
                daysAgo={7}
              />
            </div>
          </CardContent>
        </Card>

        {/* Candidate pipeline */}
        <Card>
          <CardHeader>
            <CardTitle>Candidate Pipeline</CardTitle>
            <CardDescription>Overview of your hiring funnel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <PipelineStage stage="Applied" count={89} percentage={100} />
              <PipelineStage stage="Screening" count={55} percentage={62} />
              <PipelineStage stage="Interview" count={34} percentage={38} />
              <PipelineStage stage="Offer" count={13} percentage={15} />
              <PipelineStage stage="Hired" count={8} percentage={9} />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, change }) {
  return (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className="rounded-full p-3 bg-blue-100">
          <Icon className="h-8 w-8 text-blue-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm font-medium text-green-600">{change} this week</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function JobListing({ title, department, location, applicants, daysAgo }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="mt-1 flex items-center text-sm text-gray-600">
          <Badge variant="secondary" className="mr-2">{department}</Badge>
          <span>{location}</span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">{applicants} applicants</p>
        <p className="text-sm text-gray-600">{daysAgo} days ago</p>
      </div>
    </div>
  );
}

function PipelineStage({ stage, count, percentage }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{stage}</span>
        <span className="text-sm font-medium text-gray-700">{count}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}