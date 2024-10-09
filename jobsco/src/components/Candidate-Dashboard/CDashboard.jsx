"use client";

import {
  MapPin,
  Phone,
  Mail,
  Briefcase,
  GraduationCap,
  Search,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const CDashboard = ({ candidateInfo, totalJobs, savedJobs, isPro }) => {
  const router = useRouter();
  const handleUpdateProfile = () => {
    router.push(`/dashboard/candidate/update-profile/${candidateInfo?.userId}`);
  };
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-8">
      <main className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-medium text-gray-100">
            Welcome back, {candidateInfo?.fullName}
          </h1>
          <p className="mt-2 text-xl text-gray-400">
            Let's find your dream {candidateInfo?.jobPreference} Job today!
          </p>
        </div>

        <CandidateProfileCard candidateData={candidateInfo} isPro={isPro} />

        <div className="mb-8 flex space-x-4">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Search className="mr-2 h-4 w-4" /> Search{" "}
            {candidateInfo?.jobPreference === "internship"
              ? "Internships"
              : "Jobs"}
          </Button>
          <Button
            variant="outline"
            className="border-blue-600 text-blue-400 hover:bg-blue-900"
            onClick={handleUpdateProfile}
          >
            <Plus className="mr-2 h-4 w-4" /> Update Profile
          </Button>
        </div>

        <JobProfileLink totalJobs={totalJobs} savedJobs={savedJobs} />

        <div className="grid gap-6 md:grid-cols-2 mt-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <CardTitle className="text-xl text-white">Education</CardTitle>
              <CardDescription className="text-blue-200">
                Your academic background
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4">
              <EducationItem
                degree={candidateInfo?.degree}
                university={candidateInfo?.universityName}
                graduationYear={candidateInfo?.graduationYear}
                major={candidateInfo?.major}
              />
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600">
              <CardTitle className="text-xl text-white">Skills</CardTitle>
              <CardDescription className="text-indigo-200">
                Your technical expertise
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4">
              <div className="flex flex-wrap gap-2 capitalize">
                {candidateInfo?.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-indigo-900 text-indigo-200"
                  >
                    {skill.trim()}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-gray-800 border-gray-700">
          <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600">
            <CardTitle className="text-xl text-white">Experience</CardTitle>
            <CardDescription className="text-green-200">
              Your professional background
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <p className="text-gray-300">{candidateInfo?.experience}</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

const CandidateProfileCard = ({ candidateData,isPro }) => {
  const { user } = useUser();
  const initials = candidateData?.fullName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className="max-w-md mx-auto mb-8 bg-gray-800 border-gray-700 overflow-hidden">
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 px-8 pt-8 pb-10">
        <div className="flex items-center space-x-4">
          <div className="w-24 h-20 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-800 shadow-xl overflow-hidden">
            <img
              src={
                user?.imageUrl || (
                  <span className="text-2xl font-bold text-gray-700">
                    {initials}
                  </span>
                )
              }
              alt={candidateData.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="flex items-center text-3xl font-bold text-white">
              {candidateData?.fullName}{" "}
              {isPro === "success" ? (
                <Badge variant="primary" className={`ml-1 bg-amber-400`}>
                  Premium
                </Badge>
              ) : (
                ""
              )}
            </h2>
            <p className="text-blue-200 text-lg mt-1">
              {candidateData?.degree} {candidateData?.jobTitle}
            </p>
          </div>
        </div>
      </div>
      <CardContent className="px-8 py-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {candidateData?.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-900 text-blue-200"
              >
                {skill.trim()}
              </Badge>
            ))}
          </div>
          <div className="space-y-3">
            <InfoItem icon={MapPin} text={candidateData?.location} />
            <InfoItem icon={Phone} text={candidateData?.phone} />
            <InfoItem icon={Mail} text={candidateData?.email} />
            <InfoItem icon={GraduationCap} text={`${candidateData?.degree}`} />
            <InfoItem icon={Briefcase} text="Seeking Opportunities" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const InfoItem = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-3 text-gray-300">
    <Icon className="h-5 w-5 text-blue-400" />
    <span className="text-base">{text}</span>
  </div>
);

const JobProfileLink = ({ totalJobs, savedJobs }) => (
  <Link href="/job-profile" className="block">
    <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            Your Job Profile
          </h3>
          <p className="text-blue-200">
            {totalJobs} applied jobs • {savedJobs} saved jobs
          </p>
        </div>
        <ArrowRight className="h-6 w-6 text-white" />
      </CardContent>
    </Card>
  </Link>
);

const EducationItem = ({ degree, university, graduationYear, major }) => (
  <div className="flex items-start space-x-4">
    <div className="rounded-full p-2 bg-blue-900">
      <GraduationCap className="h-6 w-6 text-blue-300" />
    </div>
    <div>
      <h3 className="text-xl font-light text-gray-100">{degree}</h3>
      <p className="text-base text-gray-400">{university}</p>
      <p className="text-base text-gray-400">Graduating: {graduationYear}</p>
      <p className="text-base text-gray-400">Major: {major}</p>
    </div>
  </div>
);

export default CDashboard;
