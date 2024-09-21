import { currentUser } from "@clerk/nextjs/server";
import { fetchCandidateInfo } from "@/actions/fetchInfo-action";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Briefcase,
  GraduationCap,
  MessageSquare,
  Search,
  Plus,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

async function CandidateDashboard() {
  const user = await currentUser();
  const { data: candidateInfo } = await fetchCandidateInfo(user?.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      <main className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Welcome back, {candidateInfo?.fullName}
          </h1>
          <p className="mt-2 text-xl text-gray-600">
            Let's find your dream {candidateInfo?.jobPreference} today!
          </p>
        </div>

        <CandidateProfileCard candidateData={candidateInfo} />

        <div className="mb-8 flex space-x-4">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
            <Search className="mr-2 h-4 w-4" /> Search{" "}
            {candidateInfo?.jobPreference === "internship"
              ? "Internships"
              : "Jobs"}
          </Button>
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300"
          >
            <Plus className="mr-2 h-4 w-4" /> Update Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Briefcase}
            title="Applied Jobs"
            value="5"
            change="+2 this week"
          />
          <StatCard icon={Star} title="Saved Jobs" value="12" />
          <StatCard icon={Clock} title="Pending Applications" value="3" />
          <StatCard
            icon={MessageSquare}
            title="New Messages"
            value="7"
            change="+3 today"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-xl">Education</CardTitle>
              <CardDescription className="text-blue-100">
                Your academic background
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4">
              <div className="space-y-4">
                <EducationItem
                  degree={candidateInfo?.degree}
                  university={candidateInfo?.universityName}
                  graduationYear={candidateInfo?.graduationYear}
                  major={candidateInfo?.major}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <CardTitle className="text-xl">Skills</CardTitle>
              <CardDescription className="text-indigo-100">
                Your technical expertise
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4">
              <div className="flex flex-wrap gap-2 capitalize">
                {candidateInfo?.skills[0].split(",").map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-indigo-100 text-indigo-800 capitalize"
                  >
                    {skill.trim()}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
            <CardTitle className="text-xl">Experience</CardTitle>
            <CardDescription className="text-green-100">
              Your professional background
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <p className="text-gray-700">{candidateInfo?.experience}</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function CandidateProfileCard({ candidateData }) {
  return (
    <Card className="mb-8 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xl capitalize">
              {candidateData?.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-900 capitalize">
              {candidateData?.fullName}
            </h2>
            <p className="text-gray-600 capitalize">
              {candidateData?.degree} Student
            </p>
            <div className="mt-2 flex flex-wrap gap-2 capitalize">
              {candidateData?.skills[0]
                .split(",")
                .slice(0, 3)
                .map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 capitalize"
                  >
                    {skill.trim()}
                  </Badge>
                ))}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {candidateData?.location}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {candidateData?.phone}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {candidateData?.email}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({ icon: Icon, title, value, change }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className="rounded-full p-3 bg-gradient-to-br from-blue-400 to-indigo-500">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {change && (
              <p className="text-sm font-medium text-green-600">{change}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EducationItem({ degree, university, graduationYear, major }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="rounded-full p-2 bg-blue-100">
        <GraduationCap className="h-6 w-6 text-blue-600" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">{degree}</h3>
        <p className="text-sm text-gray-600">{university}</p>
        <p className="text-sm text-gray-600">Graduating: {graduationYear}</p>
        <p className="text-sm text-gray-600">Major: {major}</p>
      </div>
    </div>
  );
}

export default CandidateDashboard;
