"use client";

import { postJobs } from "@/actions/post-joblisting";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Calendar,
  DollarSign,
  Briefcase,
  MapPin,
  GraduationCap,
  Mail,
  Plus,
  X,
  Building,
  ChartNoAxesGantt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const jobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  jobType: z.enum(["fulltime", "parttime", "internship", "contract"]),
  salary: z.string().min(1, "salary must be a positive number"),
  experienceLevel: z.string().min(1, "Experience level is required"),
  industry: z.string().optional(),
  educationRequirements: z.string().optional(),
  applicationDeadline: z.string().optional(),
  contactEmail: z.string().email("Invalid email address"),
  description: z.string().min(1, "Job description is required"),
  skills: z.array(z.string()),
  benefits: z.array(z.string()),
  companyLogo: z.string().url("Invalid URL").optional(),
});

export default function JobPostingForm() {
  const [skills, setSkills] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [newBenefit, setNewBenefit] = useState("");

  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      skills: [],
      benefits: [],
    },
  });

  async function onSubmit(data) {
    const userRef = user;
    const formData = {
      ...data,
      userRef,
    };

    await postJobs(formData);

    router.push(`${user}/jobs`);
  }

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()]);
      setValue("skills", [...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim() !== "") {
      setBenefits([...benefits, newBenefit.trim()]);
      setValue("benefits", [...benefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    setValue("skills", updatedSkills);
  };

  const handleRemoveBenefit = (index) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(updatedBenefits);
    setValue("benefits", updatedBenefits);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden"
        >
          <div className="px-6 sm:px-10 py-8 sm:py-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-8 sm:mb-12">
              Post a New Job
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 sm:space-y-8"
            >
              <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2">
                <div className="col-span-full">
                  <Label
                    htmlFor="title"
                    className="text-lg font-semibold text-gray-300"
                  >
                    Job Title
                  </Label>
                  <Input
                    id="title"
                    {...register("title", {
                      required: "Job title is required",
                    })}
                    className="mt-2 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter job title"
                  />
                  {errors.title && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="company"
                    className="text-lg font-semibold text-gray-300"
                  >
                    Company
                  </Label>
                  <div className="mt-2 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="company"
                      {...register("company", {
                        required: "Company is required",
                      })}
                      className="pl-10 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter company name"
                    />
                  </div>
                  {errors.company && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.company.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="location"
                    className="text-lg font-semibold text-gray-300"
                  >
                    Location
                  </Label>
                  <div className="mt-2 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="location"
                      {...register("location", {
                        required: "Location is required",
                      })}
                      className="pl-10 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter location"
                    />
                  </div>
                  {errors.location && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <label
                    htmlFor="jobType"
                    className="block text-lg font-semibold text-gray-300"
                  >
                    Job Type
                  </label>
                  <select
                    id="jobType"
                    {...register("jobType", {
                      required: "Job type is required",
                    })}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-300 text-sm"
                  >
                    <option value="">Select a job type</option>
                    <option value="fulltime">Full-time</option>
                    <option value="parttime">Part-time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                  </select>
                </motion.div>

                <div>
                  <Label
                    htmlFor="salary"
                    className="text-lg font-semibold text-gray-300"
                  >
                    Salary
                  </Label>
                  <div className="mt-2 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="salary"
                      type="text"
                      {...register("salary", {
                        required: "salary is required",
                      })}
                      className="pl-10 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="115k"
                    />
                  </div>
                  {errors.salary && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.salary.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="experienceLevel"
                    className="text-lg font-semibold text-gray-300"
                  >
                    Experience Level
                  </Label>
                  <div className="mt-2 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="experienceLevel"
                      {...register("experienceLevel", {
                        required: "Experience level is required",
                      })}
                      className="pl-10 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter experience level"
                    />
                  </div>
                  {errors.experienceLevel && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.experienceLevel.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="industry"
                    className="text-lg font-semibold text-gray-300"
                  >
                    Industry
                  </Label>
                  <div className="mt-2 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ChartNoAxesGantt className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="industry"
                      {...register("industry", {
                        required: "Industry is required",
                      })}
                      className="pl-10 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter industry"
                    />
                  </div>
                  {errors.industry && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.industry.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="educationRequirements"
                    className="text-lg font-semibold text-gray-300"
                  >
                    Education Requirements
                  </Label>
                  <div className="mt-2 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <GraduationCap className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="educationRequirements"
                      {...register("educationRequirements", {
                        required: "Education requirements are required",
                      })}
                      className="pl-10 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter education requirements"
                    />
                  </div>
                  {errors.educationRequirements && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.educationRequirements.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="applicationDeadline"
                    className="text-lg font-semibold text-gray-300"
                  >
                    Application Deadline
                  </Label>
                  <div className="mt-2 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="applicationDeadline"
                      type="date"
                      {...register("applicationDeadline", {
                        required: "Application deadline is required",
                      })}
                      className="pl-10 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  {errors.applicationDeadline && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.applicationDeadline.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="contactEmail"
                    className="text-lg font-semibold text-gray-300"
                  >
                    Contact Email
                  </Label>
                  <div className="mt-2 relative rounded-md shadow-sm">
                    <div className="absolute  inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="contactEmail"
                      type="email"
                      {...register("contactEmail", {
                        required: "Contact email is required",
                      })}
                      className="pl-10 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.contactEmail && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.contactEmail.message}
                    </p>
                  )}
                </div>

                <div className="col-span-full">
                  <Label
                    htmlFor="description"
                    className="text-lg font-semibold text-gray-300"
                  >
                    Job Description
                  </Label>
                  <Textarea
                    id="description"
                    {...register("description", {
                      required: "Job description is required",
                    })}
                    rows="4"
                    className="mt-2 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter a job description"
                  />
                  {errors.description && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="col-span-full">
                  <Label
                    htmlFor="skills"
                    className="text-lg font-semibold text-gray-300"
                  >
                    Skills Required
                  </Label>
                  <div className="mt-2 flex rounded-md shadow-sm">
                    <Input
                      id="skills"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="flex-1 rounded-r-none bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Add a skill"
                    />
                    <Button
                      type="button"
                      onClick={handleAddSkill}
                      className="rounded-l-none bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900 text-blue-200"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(index)}
                          className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-800 hover:text-blue-200 focus:outline-none focus:bg-blue-500 focus:text-white"
                        >
                          <span className="sr-only">Remove skill</span>
                          <X className="h-3 w-3" />
                        </button>
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="col-span-full">
                  <Label
                    htmlFor="benefits"
                    className="text-lg font-semibold text-gray-300"
                  >
                    Benefits
                  </Label>
                  <div className="mt-2 flex rounded-md shadow-sm">
                    <Input
                      id="benefits"
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      className="flex-1 rounded-r-none bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Add a benefit"
                    />
                    <Button
                      type="button"
                      onClick={handleAddBenefit}
                      className="rounded-l-none bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {benefits.map((benefit, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-900 text-purple-200"
                      >
                        {benefit}
                        <button
                          type="button"
                          onClick={() => handleRemoveBenefit(index)}
                          className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-purple-400 hover:bg-purple-800 hover:text-purple-200 focus:outline-none focus:bg-purple-500 focus:text-white"
                        >
                          <span className="sr-only">Remove benefit</span>
                          <X className="h-3 w-3" />
                        </button>
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="col-span-full">
                  <Label
                    htmlFor="companyLogo"
                    className="text-lg font-semibold text-gray-300"
                  >
                    Company Logo URL{" "}
                    <span className="text-sm font-light text-green-400">
                      (only supported type is: data:image/png;base64,* )
                    </span>
                  </Label>
                  <Input
                    id="companyLogo"
                    type="url"
                    {...register("companyLogo")}
                    className="mt-1 bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="https://example.com/logo.png"
                  />
                  {errors.companyLogo && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.companyLogo.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Post Job
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
