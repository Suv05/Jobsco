"use client";

import Spinner from "@/app/loading";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Trash2,
  User,
  Mail,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function RecruiterJobsPage({ jobs }) {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    return (
      <>
        <Spinner />
      </>
    );
  }

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

  async function handleStatusChange(jobId, candidateId, value) {
    console.log(jobId, candidateId, value);
    //call api here to update status
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 mt-3">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Your Listed Jobs{" "}
            <span className="text-gray-400 text-xl border border-gray-700 rounded-full px-4 py-1 ml-2">
              {jobs.length}
            </span>
          </h1>
          <div className="flex items-center text-gray-400 bg-gray-800 rounded-full px-4 py-2">
            <span className="mr-2 text-sm">Sort by:</span>
            <span className="font-medium text-sm">Last updated</span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </div>
        </div>
        <div className="space-y-6">
          {jobs.map((job) => (
            <Card key={job._id} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="bg-gray-700 p-2 rounded-full mr-4">
                      <Image
                        src={job.companyLogo}
                        alt={`${job.company} logo`}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-light text-white">
                        {job.title}
                      </h2>
                      <p className="text-lg text-gray-400">{job.company}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handelJobDelete(job._id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base mb-4 text-gray-300">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className=" capitalize  text-xs bg-gray-700 text-[#ffffff] rounded-full px-3 py-1">
                    {job.jobType}
                  </span>
                  <span className=" capitalize text-xs bg-gray-700 text-[#ffffff] rounded-full px-3 py-1">
                    {job.experienceLevel}
                  </span>
                  {job.skillsRequired.map((skill, index) => (
                    <span
                      key={index}
                      className=" capitalize text-xs bg-gray-700 text-[#ffffff] rounded-full px-3 py-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span>{job.industry}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    <span>{job.educationRequirements}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {new Date(job.applicationDeadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl text-[#ffffff] font-bold">
                    ${job.salary}/hr
                  </span>
                  <Button onClick={() => handelEditJob(job._id)}>
                    Edit Job
                  </Button>
                </div>
                <Accordion type="single" collapsible className="mt-6">
                  <AccordionItem value="candidates">
                    <AccordionTrigger>View Candidates</AccordionTrigger>
                    <AccordionContent>
                      {job.candidates && job.candidates.length > 0 ? (
                        job.candidates.map((candidate) => (
                          <div
                            key={candidate.userId}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 border-b border-gray-700 gap-4"
                          >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                              <div className="flex items-center">
                                <User className="w-5 h-5 mr-2" />
                                <span className="mr-4 text-[#ffffff]">
                                  {candidate.userName}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Mail className="w-5 h-5 mr-2" />
                                <span className="mr-4 break-all text-[#ffffff]">
                                  {candidate.userEmail}
                                </span>
                              </div>
                              <div className="flex items-center">
                                {candidate.status === "rejected" ? (
                                  <img
                                    src="/red.png"
                                    alt="green tick"
                                    className="w-4 h-4 mr-2"
                                  />
                                ) : (
                                  <img
                                    src="/green.png"
                                    alt="green tick"
                                    className="w-4 h-4 mr-2"
                                  />
                                )}
                                <span className="mr-4 break-all text-[#ffffff]">
                                  Status:{" "}
                                  <span className="capitalize">
                                    {candidate.status}
                                  </span>
                                </span>
                              </div>
                              <a
                                href={candidate.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-400 hover:text-blue-300"
                              >
                                <FileText className="w-5 h-5 mr-1" />
                                Resume
                              </a>
                            </div>
                            <Select
                              onValueChange={(value) =>
                                handleStatusChange(
                                  job._id,
                                  candidate.userId,
                                  value
                                )
                              }
                              defaultValue={candidate.status}
                            >
                              <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="screening">
                                  Screening
                                </SelectItem>
                                <SelectItem value="interview">
                                  Interview
                                </SelectItem>
                                <SelectItem value="offer">Offer</SelectItem>
                                <SelectItem value="rejected">
                                  Rejected
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">
                          No candidates have applied yet.
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
