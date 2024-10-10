"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { useUser } from "@clerk/nextjs";
import {
  Briefcase,
  Star,
  Clock,
  MessageSquare,
  MapPin,
  Building,
  Calendar,
  ArrowUpRight,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function JobProfile({
  userDetails,
  saved,
  applied,
  savedJobs,
  appliedJobs,
}) {
  const [activeTab, setActiveTab] = useState("applied");
  const { user } = useUser();

  const stats = [
    {
      icon: Briefcase,
      title: "Applied Jobs",
      value: applied || 0,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Star,
      title: "Saved Jobs",
      value: saved || 0,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Pending Applications",
      value: 0,
      color: "from-orange-500 to-red-500",
    },
    {
      icon: MessageSquare,
      title: "New Messages",
      value: 7,
      color: "from-green-500 to-teal-500",
      beta: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4 bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg"
        >
          <Avatar className="h-24 w-24 border-4 border-blue-500">
            <AvatarImage src={user?.imageUrl} alt={userDetails?.fullName} />
            <AvatarFallback>
              {userDetails?.fullName

                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              {userDetails?.fullName}
            </h1>
            <p className="text-xl text-gray-300 mt-1">
              {userDetails?.jobTitle}
            </p>
            <div className="flex items-center mt-2 text-sm text-gray-400">
              <Mail className="w-4 h-4 mr-1 text-blue-400" />
              {userDetails?.email}
            </div>
            <div className="flex items-center mt-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4 mr-1 text-blue-400" />
              {userDetails?.location}
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                className={`bg-gradient-to-br ${stat.color} border-none hover:shadow-lg transition-shadow duration-300`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white bg-opacity-20 rounded-full">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-100">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-white">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                  {stat.beta && (
                    <Badge className="absolute top-2 right-2 bg-white text-gray-900 font-semibold">
                      Beta
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Job Applications */}
        <Card className="bg-gray-800 border-gray-700 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600">
            <CardTitle className="text-2xl">Job Applications</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                <TabsTrigger
                  value="applied"
                  className="data-[state=active]:bg-gray-600"
                >
                  Applied Jobs
                </TabsTrigger>
                <TabsTrigger
                  value="saved"
                  className="data-[state=active]:bg-gray-600"
                >
                  Saved Jobs
                </TabsTrigger>
              </TabsList>
              <TabsContent value="applied" className="p-4 space-y-4">
                {appliedJobs && appliedJobs.length > 0 ? (
                  appliedJobs.map((job) => (
                    <JobCard key={job._id} job={job} type="applied" />
                  ))
                ) : (
                  <p className="text-center text-white text-lg">
                    😯 No Applied Jobs
                  </p>
                )}
              </TabsContent>
              <TabsContent value="saved" className="p-4 space-y-4">
                {savedJobs && savedJobs.length > 0 ? (
                  savedJobs.map((job) => (
                    <JobCard key={job._id} job={job} type="saved" />
                  ))
                ) : (
                  <p className="text-center text-white text-lg">
                    🙄 No Saved Jobs
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Application Progress */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600">
            <CardTitle className="text-2xl">Application Progress</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <ProgressBar label="Profile Completion" value={80} />
              <ProgressBar
                label="Applications Submitted"
                value={applied}
                maxValue={parseInt(applied) + parseInt(saved)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="bg-gradient-to-r from-yellow-600 to-orange-600">
            <CardTitle className="text-2xl">
              Recent Activity{" "}
              <span>
                <Badge className=" bg-[#222222] text-white font-semibold text-base">
                  Beta
                </Badge>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                {
                  icon: Briefcase,
                  text: "Applied to Frontend Developer at TechCorp",
                },
                {
                  icon: Star,
                  text: "Saved Full Stack Developer job at StackInnovate",
                },
                {
                  icon: MessageSquare,
                  text: "Received a message from WebSolutions recruiter",
                },
                { icon: Building, text: "Viewed company profile of DesignHub" },
                { icon: Calendar, text: "Scheduled interview with JSMasters" },
              ].map((activity, index) => (
                <ActivityItem
                  key={index}
                  icon={activity.icon}
                  text={activity.text}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const JobCard = ({ job, type }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-300"
  >
    <div>
      <h3 className="font-semibold text-lg">{job.title}</h3>
      <p className="text-sm text-gray-300">{job.company}</p>
      <div className="flex items-center mt-2 text-xs text-gray-400">
        <MapPin className="w-3 h-3 mr-1" />
        {job.location}
      </div>
    </div>
    <div className="text-right capitalize">
      {type === "applied" && (
        <Badge
          className="mb-2 mr-2"
          variant={job.status === "Interviewing" ? "success" : "secondary"}
        >
          {job.status}
        </Badge>
      )}
      <Link href={`/jobs/${job._id}`}>
        <Button variant="outline" size="sm" className="group">
          {type === "applied" ? "View" : "Apply Now"}
          <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Button>
      </Link>
    </div>
  </motion.div>
);

const ProgressBar = ({ label, value, maxValue = 100 }) => (
  <div>
    <div className="flex justify-between mb-1 text-sm">
      <span>{label}</span>
      <span>
        {value}/{maxValue}
      </span>
    </div>
    <Progress value={(value / maxValue) * 100} className="h-2" />
  </div>
);

const ActivityItem = ({ icon: Icon, text }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    className="flex items-center space-x-3 text-sm bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors duration-300"
  >
    <Icon className="h-5 w-5 text-blue-400" />
    <span>{text}</span>
  </motion.div>
);
