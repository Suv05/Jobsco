"use client";

import { saveJob, checkIfJobIsSaved } from "@/actions/Saved-Job-Action";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import {
  BookmarkPlus,
  ArrowUpDown,
  Briefcase,
  MapPin,
  DollarSign,
  Filter,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const cardColors = [
  "bg-[#2a2438]",
  "bg-[#352f44]",
  "bg-[#3a3845]",
  "bg-[#2c3333]",
];

const jobTypes = ["fulltime", "parttime", "internship", "contract"];

export default function Jobs({ jobs }) {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const [savedJobs, setSavedJobs] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("lastUpdated");
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [location, setLocation] = useState("");

  // Check if job is saved when the component mounts
  useEffect(() => {
    const fetchSavedStatus = async () => {
      const savedStatuses = {};
      for (const job of jobs) {
        const response = await checkIfJobIsSaved(job._id, user);
        savedStatuses[job._id] = response.status === "saved";
      }
      setSavedJobs(savedStatuses);
    };

    if (user) {
      fetchSavedStatus();
    }
  }, [jobs, user]);

  const handelBookMark = async (jobId, user) => {
    const response = await saveJob(jobId, user);
    if (response.status === "success") {
      setSavedJobs((prevSavedJobs) => ({
        ...prevSavedJobs,
        [jobId]: true,
      }));
    }
  };

  const handleJobTypeChange = (jobType) => {
    setSelectedJobTypes((prev) =>
      prev.includes(jobType)
        ? prev.filter((type) => type !== jobType)
        : [...prev, jobType]
    );
  };

  // Filter and sort jobs based on user input
  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesJobType =
        selectedJobTypes.length === 0 || selectedJobTypes.includes(job.jobType);
      const matchesLocation =
        location === "" ||
        job.location.toLowerCase().includes(location.toLowerCase());
      return matchesSearch && matchesJobType && matchesLocation;
    })
    .sort((a, b) => {
      if (sortBy === "salary") {
        return b.salary - a.salary;
      } else {
        // Assuming there's a lastUpdated field, otherwise replace with appropriate field
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
    });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Filter and Search Section */}
      <section className="py-8 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-1/3">
              <Input
                type="text"
                placeholder="Search jobs or companies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 text-gray-100 border-gray-600 focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Select onValueChange={setSortBy} defaultValue={sortBy}>
                <SelectTrigger className="w-[180px] bg-gray-700 text-gray-100 border-gray-600">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
                  <SelectItem value="lastUpdated">Last updated</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-gray-700 text-gray-100 border-gray-600"
                  >
                    <Filter className="mr-2 h-4 w-4" /> Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-gray-700 text-gray-100 border-gray-600">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Job Type</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {jobTypes.map((type) => (
                          <div
                            key={type}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={type}
                              checked={selectedJobTypes.includes(type)}
                              onCheckedChange={() => handleJobTypeChange(type)}
                            />
                            <Label htmlFor={type} className="capitalize">
                              {type}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Location</h4>
                      <Input
                        type="text"
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="bg-gray-600 text-gray-100 border-gray-500"
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
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
              <select
                className="bg-gray-800 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 px-2"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="lastUpdated">Last updated</option>
                <option value="salary">Salary</option>
              </select>
              <ArrowUpDown size={16} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
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
                    src={job?.companyLogo}
                    alt={job.company}
                    className="w-12 h-12 rounded-full"
                    width={25}
                    height={25}
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
                    <p className="text-lg font-semibold">${job.salary}/hr</p>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <p>{job.location}</p>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <p className="capitalize">{job.jobType}</p>
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
