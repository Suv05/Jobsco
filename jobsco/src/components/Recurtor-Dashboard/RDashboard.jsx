"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Plus, Search, ArrowRight } from "lucide-react";

import RecruiterProfileCard from "../Info-card/RecutorProfileCard.jsx";

export default function RDashboard({ recruiterInfo, recruiterJobInfo,isPro }) {
  const { user } = useUser();
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-100 px-2 mt-3">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Welcome back, {recruiterInfo.fullName}
            </h1>
          </div>

          <RecruiterProfileCard recruiterData={recruiterInfo} isPro={isPro} />

          <div className="mb-8 flex space-x-4">
            <Link href="/post-job">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                <Plus className="mr-2 h-4 w-4" /> Post New Job
              </Button>
            </Link>

            <Button
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-900/50 transition-all duration-300"
            >
              <Search className="mr-2 h-4 w-4" /> Search Candidates
            </Button>
          </div>

          <Card className="mb-8 overflow-hidden bg-gray-800 border-gray-700">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-700 text-white flex justify-between items-start">
              <div>
                <CardTitle>Recent Job Postings</CardTitle>
                <CardDescription className="text-blue-200">
                  Your most recent job listings
                </CardDescription>
              </div>
              <Link href={`/${user?.id}/jobs`} passHref>
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-blue-100 bg-blue-500/20 hover:bg-blue-500/30"
                >
                  View all jobs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mt-2">
                {recruiterJobInfo && recruiterJobInfo.length > 0 ? (
                  recruiterJobInfo.map((job, index) => (
                    <JobListing
                      key={index}
                      id={job.id}
                      title={job?.title}
                      department={job?.industry}
                      location={job?.location}
                      applicantsCount={job?.applicantsCount} // Pass the applicants count
                      daysAgo={Math.round(
                        (new Date() - new Date(job?.createdAt)) /
                          (1000 * 60 * 60 * 24)
                      )}
                    />
                  ))
                ) : (
                  <p className="text-center text-2xl font-semibold text-gray-300">
                    No Jobs Available
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
              <CardTitle>Candidate Pipeline</CardTitle>
              <CardDescription className="text-blue-200">
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
    </>
  );
}

function JobListing({
  id,
  title,
  department,
  location,
  applicantsCount,
  daysAgo,
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow hover:shadow-md transition-all duration-300">
      <div>
        <h3 className="text-lg font-medium text-gray-100">{title}</h3>
        <div className="mt-1 flex items-center text-sm text-gray-300">
          <Badge variant="secondary" className="mr-2 bg-blue-900 text-blue-200">
            {department}
          </Badge>
          <span>{location}</span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-200">
          {applicantsCount} applicants
        </p>
        <p className="text-sm text-gray-400">{daysAgo} days ago</p>
        <Link href={`/job-profile/${id}`}>
          <Button
            variant="link"
            size="sm"
            className="text-blue-400 hover:text-blue-300 p-0 h-auto"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}

function PipelineStage({ stage, count, percentage }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-300">{stage}</span>
        <span className="text-sm font-medium text-gray-300">{count}</span>
      </div>
      <Progress value={percentage} className="h-2 bg-gray-700" />
    </div>
  );
}
