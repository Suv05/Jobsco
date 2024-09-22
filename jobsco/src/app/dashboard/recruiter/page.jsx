import { currentUser } from "@clerk/nextjs/server";
import { fetchRecuterInfo } from "@/actions/fetchInfo-action";

import Link from "next/link";

import RecutorProfileCard from "@/components/Info-card/RecutorProfileCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  Users,
  BarChart2,
  MessageSquare,
  Search,
  Plus,
} from "lucide-react";

async function RecruiterDashboard() {
  const user = await currentUser();
  const { data: recurtorInfo } = await fetchRecuterInfo(user?.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-2 mt-3">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Welcome back, {recurtorInfo.fullName}
          </h1>
        </div>

        <RecutorProfileCard recruiterData={recurtorInfo} />

        <div className="mb-8 flex space-x-4">
          <Link href={`/post-job`}>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
              <Plus className="mr-2 h-4 w-4" /> Post New Job
            </Button>
          </Link>

          <Button
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-50 transition-all duration-300"
          >
            <Search className="mr-2 h-4 w-4" /> Search Candidates
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Briefcase}
            title="Active Jobs"
            value="12"
            change="+2"
          />
          <StatCard
            icon={Users}
            title="Total Applicants"
            value="143"
            change="+28"
          />
          <StatCard icon={BarChart2} title="Interview Scheduled" value="8" />
          <StatCard
            icon={MessageSquare}
            title="Unread Messages"
            value="24"
            change="+5"
          />
        </div>

        <Card className="mb-8 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardTitle>Recent Job Postings</CardTitle>
            <CardDescription className="text-blue-100">
              Your most recent job listings
            </CardDescription>
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

        <Card>
          <CardHeader className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <CardTitle>Candidate Pipeline</CardTitle>
            <CardDescription className="text-blue-100">
              Overview of your hiring funnel
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="space-y-6">
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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className="rounded-full p-3 bg-gradient-to-br from-blue-400 to-purple-500">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {change && (
              <p className="text-sm font-medium text-green-600">
                {change} this week
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function JobListing({ title, department, location, applicants, daysAgo }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-all duration-300">
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="mt-1 flex items-center text-sm text-gray-600">
          <Badge variant="secondary" className="mr-2 bg-blue-100 text-blue-800">
            {department}
          </Badge>
          <span>{location}</span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">
          {applicants} applicants
        </p>
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

export default RecruiterDashboard;
