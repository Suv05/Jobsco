"use client";

import { saveJob, checkIfJobIsSaved } from "@/actions/Saved-Job-Action";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { BookmarkPlus, ArrowUpDown } from "lucide-react";
import { useState, useEffect } from "react";

const cardColors = [
  "bg-[#e3dbfa]",
  "bg-[#fbe2f4]",
  "bg-[#ffe1cc]",
  "bg-[#d4f6ed]",
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
    <div className="min-h-screen bg-white text-gray-900 p-4 sm:p-8 mt-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mt-12 mb-6">
          <h2 className="text-2xl font-bold">Recommended jobs</h2>
          <div className="flex items-center space-x-2 text-gray-600">
            <span>Sort by:</span>
            <select className="bg-transparent focus:outline-none">
              <option>Last updated</option>
            </select>
            <ArrowUpDown size={16} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
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
                  <h3 className="text-2xl text-black font-normal mb-1 capitalize">
                    {job.title}
                  </h3>
                  <p className="text-[#222222]">{job.company}</p>
                </div>
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skillsRequired.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className=" bg-opacity-50 text-sm px-2 py-1 rounded-xl capitalize border border-gray-400 text-[#222222]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-gray-600 text-sm">
                <p className="text-lg text-[#222222] font-semibold">
                  ${job.salary}/hr
                </p>
                <p>{job.location}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  className="bg-black hover:bg-[#222222] text-white px-4 py-2 rounded-xl transition-colors duration-300"
                  onClick={() => router.push(`/jobs/${job._id}`)}
                >
                  Details
                </button>
                <button
                  className={`text-black rounded-full hover:text-indigo-400 transition-colors px-2 py-1.5 duration-300 ${
                    savedJobs[job._id] && "text-white bg-[#222222]"
                  }`}
                  aria-label="Bookmark job"
                  onClick={() => handelBookMark(job._id, user)}
                >
                  <BookmarkPlus size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
