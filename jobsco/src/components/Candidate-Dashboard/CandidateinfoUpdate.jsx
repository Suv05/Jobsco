"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { createCandidate, updateCandidate } from "@/actions/onboard-action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  GraduationCap,
  BookOpen,
  Calendar,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Globe,
  FileText,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  universityName: z
    .string()
    .min(2, { message: "University name must be at least 2 characters." }),
  degree: z
    .string()
    .min(2, { message: "Degree must be at least 2 characters." }),
  graduationYear: z
    .string()
    .regex(/^\d{4}$/, { message: "Please enter a valid 4-digit year." }),
  major: z.string().min(2, { message: "Major must be at least 2 characters." }),
  jobTitle: z
    .string()
    .min(2, { message: "Job title must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." }),
  skills: z
    .string()
    .min(1, { message: "Please enter at least one skill." })
    .transform((value) => value.split(",").map((skill) => skill.trim())), // Convert string to array of skills,
  experience: z
    .string()
    .max(1000, { message: "Experience must not exceed 1000 characters." })
    .optional(),
  portfolio: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
  jobPreference: z.enum(["fulltime", "parttime", "internship", "contract"]),
  resumeLink: z
    .string()
    .url({ message: "Please enter a valid URL for your resume." })
    .optional()
    .or(z.literal("")),
  notifications: z.boolean().default(false),
});

export default function CandidateinfoUpdate({ candidateInfo }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: candidateInfo?.fullName || "",
      universityName: candidateInfo?.universityName || "",
      degree: candidateInfo?.degree || "",
      graduationYear: candidateInfo?.graduationYear || "",
      jobTitle: candidateInfo?.jobTitle || "",
      major: candidateInfo?.major || "",
      email: candidateInfo?.email || "",
      phone: candidateInfo?.phone || "",
      location: candidateInfo?.location || "",
      skills: candidateInfo?.skills || "",
      experience: candidateInfo?.experience || "",
      portfolio: candidateInfo?.portfolio || "",
      jobPreference: candidateInfo?.jobPreference || "",
      resumeLink: candidateInfo?.resumeLink || "",
      notifications: candidateInfo?.notifications || false,
    },
  });

  const { user } = useUser();
  const router = useRouter();

  async function onSubmit(values) {
    console.log("Submitting form data:", values);

    const userId = user?.id;
    const role = user?.unsafeMetadata?.role;
    const formData = {
      userId,
      role,
      ...values,
    };

    const updatedCandidate = await updateCandidate(userId, formData);
    console.log(updatedCandidate);
    if (updatedCandidate.status === "success") {
      router.push("/dashboard/candidate");
    } else {
      console.error("Candidate updatetion failed:", updatedCandidate.message);
      form.setError("root", {
        type: "manual",
        message:
          updatedCandidate.message ||
          "Failed to update profile. Please try again.",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 mt-3">
      <Card className="w-full max-w-4xl shadow-2xl bg-gray-800/80 backdrop-blur-sm text-gray-100">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Complete Your Candidate Profile
          </CardTitle>
          <CardDescription className="text-lg text-gray-300">
            Let's showcase your skills and experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-32 h-32 border-4 border-gray-700 shadow-lg">
                  <AvatarImage
                    src={user?.imageUrl || "/placeholder-avatar.jpg"}
                    alt="Profile picture"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500">
                    <User className="w-16 h-16 text-white" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2 text-gray-300">
                        <User className="w-4 h-4 text-blue-400" />
                        <span>Full Name</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="universityName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4 text-blue-400" />
                        <span>University Name</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Harvard University"
                          {...field}
                          className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <span>Degree</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Bachelor of Science"
                          {...field}
                          className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="graduationYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span>Graduation Year</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="2023"
                          {...field}
                          className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* job title */}
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-blue-400" />
                        <span>Job Title</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Software Engineer, Student"
                          {...field}
                          className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="major"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <span>Major</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Computer Science"
                          {...field}
                          className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <span>Email</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@example.com"
                          {...field}
                          className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-blue-400" />
                        <span>Phone</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+1 (555) 000-0000"
                          {...field}
                          className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span>Location</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="New York, NY"
                          {...field}
                          className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-blue-400" />
                        <span>Skills</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="React, Node.js, Python"
                          {...field}
                          className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="portfolio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-blue-400" />
                        <span>Portfolio URL</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://myportfolio.com"
                          {...field}
                          className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* ... */}
                <FormField
                  control={form.control}
                  name="jobPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        Job Preference
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-100">
                            <SelectValue placeholder="Select job preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem
                            value="fulltime"
                            className="text-gray-100"
                          >
                            Full-time
                          </SelectItem>
                          <SelectItem
                            value="parttime"
                            className="text-gray-100"
                          >
                            Part-time
                          </SelectItem>
                          <SelectItem
                            value="internship"
                            className="text-gray-100"
                          >
                            Internship
                          </SelectItem>
                          <SelectItem
                            value="contract"
                            className="text-gray-100"
                          >
                            Contract
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel className="flex items-center space-x-2 text-gray-300">
                        <Briefcase className="w-4 h-4 text-blue-400" />
                        <span>Experience</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Briefly describe your relevant work experience..."
                          className="resize-none bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        You can write up to 1000 characters.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-600 p-4 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base text-gray-300">
                          Job Alerts
                        </FormLabel>
                        <FormDescription className="text-gray-400">
                          Receive notifications about new job opportunities
                          matching your profile.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-blue-400"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <CardFooter className="flex justify-end px-0">
                <div className="mr-2">
                  {form.formState.errors.root && (
                    <p className="text-red-400">
                      {form.formState.errors.root.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  Complete Profile
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
