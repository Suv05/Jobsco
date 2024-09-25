"use client";

import { updateRJob } from "@/actions/fetch-Rjobs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { postJobs } from "@/actions/post-joblisting";
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

const InputWithIcon = ({ icon: Icon, ...props }) => (
  <div className="mt-2 relative rounded-md shadow-sm">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <Input
      className="pl-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      {...props}
    />
  </div>
);

const TagInput = ({ label, value, onChange, onAdd, tags, onRemove }) => (
  <div className="col-span-full">
    <Label htmlFor={label} className="text-lg font-semibold text-gray-700">
      {label}
    </Label>
    <div className="mt-2 flex rounded-md shadow-sm">
      <Input
        id={label}
        value={value}
        onChange={onChange}
        className="flex-1 rounded-r-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder={`Add a ${label.toLowerCase()}`}
      />
      <Button
        type="button"
        onClick={onAdd}
        className="rounded-l-none bg-gradient-to-r from-purple-600 to-pink-600 text-white"
      >
        <Plus className="h-5 w-5" />
      </Button>
    </div>
    <div className="mt-2 flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            label === "Skills"
              ? "bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800"
              : "bg-gradient-to-r from-green-200 to-blue-200 text-green-800"
          } capitalize`}
        >
          {tag}
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-purple-600 hover:bg-purple-300 hover:text-purple-800 focus:outline-none focus:bg-purple-500 focus:text-white"
          >
            <span className="sr-only">Remove {label.toLowerCase()}</span>
            <X className="h-3 w-3" />
          </button>
        </motion.span>
      ))}
    </div>
  </div>
);

export default function UpdateForm({ fetchData }) {
  const [skills, setSkills] = useState(fetchData?.skillsRequired || []);
  const [benefits, setBenefits] = useState(fetchData?.benefits || []);
  const [newSkill, setNewSkill] = useState("");
  const [newBenefit, setNewBenefit] = useState("");

  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  console.log(fetchData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: fetchData?.title || "",
      company: fetchData?.company || "",
      location: fetchData?.location || "",
      jobType: fetchData?.jobType || "",
      salary: fetchData?.salary || "",
      experienceLevel: fetchData?.experienceLevel || "",
      industry: fetchData?.industry || "",
      educationRequirements: fetchData?.educationRequirements || "",
      applicationDeadline: fetchData?.applicationDeadline
        ? ((isoDate) => new Date(isoDate).toLocaleDateString("en-GB"))(
            fetchData?.applicationDeadline
          )
        : "",
      contactEmail: fetchData?.contactEmail || "",
      description: fetchData?.description || "",
      skills: fetchData?.skillsRequired || [],
      benefits: fetchData?.benefits || [],
      companyLogo: fetchData?.companyLogo || "",
    },
  });

  async function onSubmit(data) {
    const jobId = fetchData._id;
    const userId = user;
    const formData = {
      ...data,
      userRef: userId,
    };

    await updateRJob(jobId, userId, formData);
    console.log("sucess");
    router.push(`/${user}/jobs`);
  }

  const handleAddTag = (tag, setTag, tags, setTags) => {
    if (tag.trim() !== "") {
      setTags([...tags, tag.trim()]);
      setValue(setTag === setNewSkill ? "skills" : "benefits", [
        ...tags,
        tag.trim(),
      ]);
      setTag("");
    }
  };

  const handleRemoveTag = (index, tags, setTags) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    setValue(tags === skills ? "skills" : "benefits", updatedTags);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden"
        >
          <div className="px-6 sm:px-10 py-8 sm:py-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8 sm:mb-12">
              Edit Job
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
                  <Label
                    htmlFor="jobType"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Job Type
                  </Label>
                  <select
                    id="jobType"
                    {...register("jobType")}
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
                    htmlFor="salary"
                    className="text-lg font-semibold text-gray-700"
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
                      className="pl-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="115k"
                    />
                  </div>
                  {errors.salary && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.salary.message}
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
                    {...register("description")}
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

                <TagInput
                  label="Skills"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onAdd={() =>
                    handleAddTag(newSkill, setNewSkill, skills, setSkills)
                  }
                  tags={skills}
                  onRemove={(index) =>
                    handleRemoveTag(index, skills, setSkills)
                  }
                />

                <TagInput
                  label="Benefits"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onAdd={() =>
                    handleAddTag(
                      newBenefit,
                      setNewBenefit,
                      benefits,
                      setBenefits
                    )
                  }
                  tags={benefits}
                  onRemove={(index) =>
                    handleRemoveTag(index, benefits, setBenefits)
                  }
                />

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
