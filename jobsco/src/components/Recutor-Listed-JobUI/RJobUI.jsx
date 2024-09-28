"use client";

//delete action
import { deleteRJob } from "@/actions/Job-Action-By-Recurtor";

import Spinner from "@/app/loading";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Trash2,
} from "lucide-react";
import Image from "next/image";

const gradients = [
  "from-pink-500 to-purple-500",
  "from-blue-500 to-teal-500",
  "from-green-500 to-lime-500",
  "from-yellow-500 to-orange-500",
  "from-red-500 to-pink-500",
  "from-indigo-500 to-purple-500",
];

export default function RJobUI({ jobs }) {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  const role = user.unsafeMetadata?.role;
  const userId = user.id;

  async function handelJobDelete(jobId) {
    const { status, message } = await deleteRJob(jobId, userId);
    if (status === "success") {
      alert(message);
    } else {
      alert(message);
    }
  }

  const handelEditJob = (jobId) => {
    router.push(`/${userId}/jobs/${jobId}/update`);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4 mt-3">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Your Listed Jobs{" "}
              <span className="text-gray-500 text-xl border border-gray-400 rounded-full px-7">
                {jobs.length}
              </span>
            </h1>
            <div className="flex items-center text-gray-600 bg-white rounded-full px-4 py-2 shadow-sm">
              <span className="mr-2 text-sm">Sort by:</span>
              <span className="font-medium text-sm">Last updated</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job._id}
                className={`rounded-xl p-6 bg-gradient-to-br ${
                  gradients[index % gradients.length]
                } text-white shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm bg-white bg-opacity-20 rounded-full px-3 py-1">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    className="text-white opacity-75 hover:opacity-100 transition-opacity"
                    onClick={() => handelJobDelete(job._id)}
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex items-center mb-4">
                  <div className="bg-white p-2 rounded-full mr-4">
                    <Image
                      src={job.companyLogo}
                      alt={`${job.company} logo`}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{job.title}</h2>
                    <p className="text-lg opacity-75">{job.company}</p>
                  </div>
                </div>
                <p className="text-sm mb-4 opacity-90">{job.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-white bg-opacity-20 rounded-full px-3 py-1">
                    {job.jobType}
                  </span>
                  <span className="text-xs bg-white bg-opacity-20 rounded-full px-3 py-1">
                    {job.experienceLevel}
                  </span>
                  {job.skillsRequired.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs bg-white bg-opacity-20 rounded-full px-3 py-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 opacity-75" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 opacity-75" />
                    <span>{job.industry}</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2 opacity-75" />
                    <span>{job.educationRequirements}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 opacity-75" />
                    <span>
                      {new Date(job.applicationDeadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="text-xs bg-white bg-opacity-20 rounded-full px-3 py-1"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold">${job.salary}/hr</span>
                  <button
                    className="bg-gradient-to-tr from-yellow-500 to-orange-500 text-white rounded-full py-2 px-6 text-sm font-medium hover:bg-opacity-90 transition-colors hover:shadow-lg hover:scale-105 transform duration-200"
                    onClick={() => handelEditJob(job._id)}
                  >
                    {role === "recruiter" ? "Edit Now" : "Apply Now"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
