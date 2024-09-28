import {
  MapPin,
  Phone,
  Mail,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Search,
  Plus,
  Star,
  Clock,
} from "lucide-react";

import Link from "next/link";

const CDashboard = ({ candidateInfo, totalJobs, savedJobs }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      <main className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-medium text-gray-900 bg-clip-text text-transparent bg-[#222222]">
            Welcome back, {candidateInfo?.fullName}
          </h1>
          <p className="mt-2 text-xl text-gray-600">
            Let's find your dream {candidateInfo?.jobPreference} today!
          </p>
        </div>

        <CandidateProfileCard candidateData={candidateInfo} />

        <div className="mb-8 flex space-x-4">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-md transition-all duration-300 flex items-center">
            <Search className="mr-2 h-4 w-4" /> Search{" "}
            {candidateInfo?.jobPreference === "internship"
              ? "Internships"
              : "Jobs"}
          </button>
          <button className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300 flex items-center">
            <Plus className="mr-2 h-4 w-4" /> Update Profile
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <Link href={`/job-profile`}>
            <StatCard
              icon={Briefcase}
              title="Applied Jobs"
              value={totalJobs}
              change="+2 this week"
            />
          </Link>
          <Link href={`/job-profile`}>
            <StatCard icon={Star} title="Saved Jobs" value={savedJobs} />
          </Link>
          <Link href={`/job-profile`}>
            <StatCard icon={Clock} title="Pending Applications" value="0" />
          </Link>
          <Link href={`/job-profile`}>
            <StatCard
              icon={MessageSquare}
              title="New Messages"
              value="7"
              change="+3 today"
            />
          </Link>
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
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium capitalize"
                  >
                    {skill.trim()}
                  </span>
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
};

const CandidateProfileCard = ({ candidateData }) => {
  const initials = candidateData?.fullName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="max-w-md mx-auto mb-8">
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl overflow-hidden">
        <div className="px-8 pt-8 pb-10">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
              {candidateData?.profileImage ? (
                <img
                  src={candidateData.profileImage}
                  alt={candidateData.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-gray-700">
                  {initials}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">
                {candidateData?.fullName}
              </h2>
              <p className="text-blue-100 text-lg mt-1">
                {candidateData?.degree} Student
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white px-8 py-6 rounded-t-3xl -mt-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {candidateData?.skills[0].split(",").map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium capitalize"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
            <div className="space-y-3">
              <InfoItem icon={MapPin} text={candidateData?.location} />
              <InfoItem icon={Phone} text={candidateData?.phone} />
              <InfoItem icon={Mail} text={candidateData?.email} />
              <InfoItem
                icon={GraduationCap}
                text={`${candidateData?.degree}`}
              />
              <InfoItem icon={Briefcase} text="Seeking Opportunities" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-3 text-[#323232]">
    <Icon className="h-5 w-5 text-blue-500" />
    <span className="text-base">{text}</span>
  </div>
);

const StatCard = ({ icon: Icon, title, value, change }) => (
  <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
    <div className="flex items-center">
      <div className="rounded-full p-3 bg-gradient-to-br from-blue-400 to-indigo-500">
        <Icon className="h-8 w-8 text-white" />
      </div>
      <div className="ml-4">
        <p className="text-base font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {change && (
          <p className="text-sm font-medium text-green-600">{change}</p>
        )}
      </div>
    </div>
  </div>
);

const EducationItem = ({ degree, university, graduationYear, major }) => (
  <div className="flex items-start space-x-4">
    <div className="rounded-full p-2 bg-blue-100">
      <GraduationCap className="h-6 w-6 text-blue-600" />
    </div>
    <div>
      <h3 className="text-xl font-light text-gray-900">{degree}</h3>
      <p className="text-base text-gray-600">{university}</p>
      <p className="text-base text-gray-600">Graduating: {graduationYear}</p>
      <p className="text-base text-gray-600">Major: {major}</p>
    </div>
  </div>
);

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className }) => (
  <p className={`text-base ${className}`}>{children}</p>
);

const CardContent = ({ children, className }) => (
  <div className={`px-6 py-4 text-lg ${className}`}>{children}</div>
);

export default CDashboard;
