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
//import { toast } from "@/components/ui/use-toast"

const jobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  jobType: z.enum(["fulltime", "parttime", "internship", "contract"]),
  salaryMin: z
    .number()
    .min(0, "Minimum salary must be a positive number")
    .optional(),
  salaryMax: z
    .number()
    .min(0, "Maximum salary must be a positive number")
    .optional(),
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden"
        >
          <div className="px-6 sm:px-10 py-8 sm:py-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8 sm:mb-12">
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
                    className="text-lg font-semibold text-gray-700"
                  >
                    Job Title
                  </Label>
                  <Input
                    id="title"
                    {...register("title", {
                      required: "Job title is required",
                    })}
                    className="mt-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter job title"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="company"
                    className="text-lg font-semibold text-gray-700"
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
                      className="pl-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter company name"
                    />
                  </div>
                  {errors.company && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.company.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="location"
                    className="text-lg font-semibold text-gray-700"
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
                      className="pl-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter location"
                    />
                  </div>
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <label
                    htmlFor="jobType"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Job Type
                  </label>
                  <select
                    id="jobType"
                    {...register("jobType", {
                      required: "Job type is required",
                    })}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-500 text-sm"
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
                    htmlFor="salaryMin"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Minimum Salary
                  </Label>
                  <div className="mt-2 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="salaryMin"
                      type="number"
                      {...register("salaryMin", {
                        valueAsNumber: true,
                        required: "Minimum salary is required",
                      })}
                      className="pl-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter minimum salary"
                    />
                  </div>
                  {errors.salaryMin && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.salaryMin.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="salaryMax"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Maximum Salary
                  </Label>
                  <div className="mt-2 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="salaryMax"
                      type="number"
                      {...register("salaryMax", {
                        valueAsNumber: true,
                        required: "Maximum salary is required",
                      })}
                      className="pl-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter maximum salary"
                    />
                  </div>
                  {errors.salaryMax && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.salaryMax.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="experienceLevel"
                    className="text-lg font-semibold text-gray-700"
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
                      className="pl-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter experience level"
                    />
                  </div>
                  {errors.experienceLevel && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.experienceLevel.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="industry"
                    className="text-lg font-semibold text-gray-700"
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
                      className="pl-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter industry"
                    />
                  </div>
                  {errors.industry && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.industry.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="educationRequirements"
                    className="text-lg font-semibold text-gray-700"
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
                      className="pl-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter education requirements"
                    />
                  </div>
                  {errors.educationRequirements && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.educationRequirements.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="applicationDeadline"
                    className="text-lg font-semibold text-gray-700"
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
                      className="pl-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Select a date"
                    />
                  </div>
                  {errors.applicationDeadline && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.applicationDeadline.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="contactEmail"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Contact Email
                  </Label>
                  <div className="mt-2 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="contactEmail"
                      type="email"
                      {...register("contactEmail", {
                        required: "Contact email is required",
                      })}
                      className="pl-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.contactEmail && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactEmail.message}
                    </p>
                  )}
                </div>

                <div className="col-span-full">
                  <Label
                    htmlFor="description"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Job Description
                  </Label>
                  <Textarea
                    id="description"
                    {...register("description", {
                      required: "Job description is required",
                    })}
                    rows="4"
                    className="mt-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter a job description"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="col-span-full">
                  <Label
                    htmlFor="skills"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Skills Required
                  </Label>
                  <div className="mt-2 flex rounded-md shadow-sm">
                    <Input
                      id="skills"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="flex-1 rounded-r-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Add a skill"
                    />
                    <Button
                      type="button"
                      onClick={handleAddSkill}
                      className="rounded-l-none bg-gradient-to-r from-purple-600 to-pink-600 text-white"
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
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800 capitalize"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(index)}
                          className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-purple-600 hover:bg-purple-300 hover:text-purple-800 focus:outline-none focus:bg-purple-500 focus:text-white capitalize"
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
                    className="text-lg font-semibold text-gray-700"
                  >
                    Benefits
                  </Label>
                  <div className="mt-2 flex rounded-md shadow-sm">
                    <Input
                      id="benefits"
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      className="flex-1 rounded-r-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Add a benefit"
                    />
                    <Button
                      type="button"
                      onClick={handleAddBenefit}
                      className="rounded-l-none bg-gradient-to-r from-purple-600 to-pink-600 text-white"
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
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-200 to-blue-200 text-green-800 capitalize"
                      >
                        {benefit}
                        <button
                          type="button"
                          onClick={() => handleRemoveBenefit(index)}
                          className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-green-600 hover:bg-green-300 hover:text-green-800 focus:outline-none focus:bg-green-500 focus:text-white"
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
                    className="text-lg font-semibold text-gray-700"
                  >
                    Company Logo URL
                  </Label>
                  <Input
                    id="companyLogo"
                    type="url"
                    {...register("companyLogo")}
                    className="mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="https://example.com/logo.png"
                  />
                  {errors.companyLogo && (
                    <p className="text-red-500 text-sm mt-1">
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
                  className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
