"use client";

import Image from "next/image";
import { saveJob, checkIfJobIsSaved } from "@/actions/Saved-Job-Action";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  BookmarkPlus,
  ArrowUpDown,
  Search,
  Briefcase,
  MapPin,
  DollarSign,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const cardColors = [
  "bg-[#2a2438]",
  "bg-[#352f44]",
  "bg-[#3a3845]",
  "bg-[#2c3333]",
];

const jobCategories = [
  { name: "Technology", icon: <Briefcase className="w-6 h-6" />, count: 1234 },
  { name: "Marketing", icon: <Briefcase className="w-6 h-6" />, count: 567 },
  { name: "Design", icon: <Briefcase className="w-6 h-6" />, count: 890 },
  { name: "Finance", icon: <Briefcase className="w-6 h-6" />, count: 432 },
];

export default function Homepage({ jobs }) {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const [savedJobs, setSavedJobs] = useState({});

  // Check if job is saved when the component mounts
  useEffect(() => {
    const fetchSavedStatus = async () => {
      const savedStatuses = {}; // Temporary object to hold saved statuses
      for (const job of jobs) {
        const response = await checkIfJobIsSaved(job._id, user);
        savedStatuses[job._id] = response.status === "saved"; // Set true if saved
      }
      setSavedJobs(savedStatuses); // Update the savedJobs state
    };

    if (user) {
      fetchSavedStatus();
    }
  }, [jobs, user]); // Run the effect whenever jobs or user changes

  const handelBookMark = async (jobId, user) => {
    const response = await saveJob(jobId, user);
    if (response.status === "success") {
      setSavedJobs((prevSavedJobs) => ({
        ...prevSavedJobs,
        [jobId]: true, // Mark the job as saved in state
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center items-center">
        <Image
          src="https://www.4kgroup.com.au/images/content/careers-44.jpg"
          alt="Background"
          fill
          quality={100}
          className="z-0 object-cover"
        />

        <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
        <div className="relative z-20 text-white p-8 w-full max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-4 text-purple-200">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-center mb-8 text-purple-100">
            Discover opportunities that match your skills and aspirations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-stretch gap-3 max-w-xl mx-auto">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search jobs..."
                className="pl-10 pr-4 py-3 w-full text-gray-200 bg-opacity-20 bg-gray-800 border-gray-700 focus:ring-purple-500 focus:border-purple-500 rounded-md placeholder-gray-400"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-purple-300" />
              </div>
            </div>
            <Button className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-3 text-lg rounded-md transition duration-300 ease-in-out">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Job Categories Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Job Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {jobCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-700 rounded-lg shadow-md p-6 flex flex-col items-center justify-center hover:bg-gray-600 transition-colors duration-300"
              >
                <div className="bg-indigo-900 rounded-full p-3 mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-300">{category.count} jobs available</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Jobs Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Recommended Jobs</h2>
            <div className="flex items-center space-x-2 text-gray-300">
              <span>Sort by:</span>
              <select className="bg-gray-800 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 px-2">
                <option>Last updated</option>
              </select>
              <ArrowUpDown size={16} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs && jobs.length > 0
              ? jobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`${
                      cardColors[index % cardColors.length]
                    } rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl text-gray-100 font-semibold mb-1 capitalize">
                          {job.title}
                        </h3>
                        <p className="text-gray-300">{job.company}</p>
                      </div>
                      <Image
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-12 h-12 rounded-full"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skillsRequired.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-gray-700 text-gray-300 text-sm px-2 py-1 rounded-full capitalize"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-gray-300 text-sm space-y-2">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <p className="text-lg font-semibold">
                          ${job.salary}/hr
                        </p>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <p>{job.location}</p>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      <Button
                        variant="default"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        onClick={() => router.push(`/jobs/${job._id}`)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="ghost"
                        className={`text-gray-300 hover:text-indigo-500 ${
                          savedJobs[job._id] && "text-indigo-700"
                        }`}
                        onClick={() => handelBookMark(job._id, user)}
                      >
                        <BookmarkPlus size={20} />
                      </Button>
                    </div>
                  </motion.div>
                ))
              : null}
          </div>
          {jobs && jobs.length > 0 ? null : (
            <Link href="/sign-in">
              <button className="mx-auto w-full rounded-lg text-white bg-[#D91656] py-2 px-4 font-light text-center text-lg">
                Recommended Jobs from top companies
              </button>
            </Link>
          )}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-indigo-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to take the next step in your career?
          </h2>
          <p className="mt-4 text-lg leading-6">
            Join thousands of job seekers who have found their dream jobs
            through JobsCo.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              className="bg-white text-indigo-900 hover:bg-gray-100"
              onClick={() => router.push(`/sign-in`)}
            >
              Create Your Profile
            </Button>
            <Button
              variant="outline"
              className="ml-4 text-black border-white hover:bg-indigo-800"
              onClick={() => router.push(`/jobs`)}
            >
              Browse All Jobs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
