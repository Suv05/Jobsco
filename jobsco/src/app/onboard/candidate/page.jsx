"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { createCandidate } from "@/actions/onboard-action";
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
  Upload,
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
    .regex(/^\d{4}$/, { message: "Please enter a valid year." }),
  major: z.string().min(2, { message: "Major must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." }),
  skills: z.string().min(2, { message: "Please enter at least one skill." }),
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

export default function CandidateDetailsForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      universityName: "",
      degree: "",
      graduationYear: "",
      major: "",
      email: "",
      phone: "",
      location: "",
      skills: "",
      experience: "",
      portfolio: "",
      jobPreference: "",
      resumeLink: "",
      notifications: false,
    },
  });

  const { user } = useUser();
  const router = useRouter();

  async function onSubmit(values) {
    console.log(values);

    const userId = user?.id;
    const role = user?.unsafeMetadata?.role;
    const formData = {
      userId,
      role,
      ...values,
    };

    const newCandidate = await createCandidate(formData);
    console.log(newCandidate);
    router.push("/dashboard/candidate");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600">
            Complete Your Candidate Profile
          </CardTitle>
          <CardDescription className="text-lg">
            Let's showcase your skills and experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage
                    src="/placeholder-user.jpg"
                    alt="Profile picture"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-teal-400 to-cyan-500">
                    <User className="w-16 h-16 text-white" />
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Photo</span>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-teal-500" />
                        <span>Full Name</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="bg-white/50"
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
                        <GraduationCap className="w-4 h-4 text-teal-500" />
                        <span>University Name</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Harvard University"
                          {...field}
                          className="bg-white/50"
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
                        <BookOpen className="w-4 h-4 text-teal-500" />
                        <span>Degree</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Bachelor of Science"
                          {...field}
                          className="bg-white/50"
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
                        <Calendar className="w-4 h-4 text-teal-500" />
                        <span>Graduation Year</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="2023"
                          {...field}
                          className="bg-white/50"
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
                        <BookOpen className="w-4 h-4 text-teal-500" />
                        <span>Major</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Computer Science"
                          {...field}
                          className="bg-white/50"
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
                        <Mail className="w-4 h-4 text-teal-500" />
                        <span>Email</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@example.com"
                          {...field}
                          className="bg-white/50"
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
                        <Phone className="w-4 h-4 text-teal-500" />
                        <span>Phone</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+1 (555) 000-0000"
                          {...field}
                          className="bg-white/50"
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
                        <MapPin className="w-4 h-4 text-teal-500" />
                        <span>Location</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="New York, NY"
                          {...field}
                          className="bg-white/50"
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
                        <Briefcase className="w-4 h-4 text-teal-500" />
                        <span>Skills</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="React, Node.js, Python"
                          {...field}
                          className="bg-white/50"
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
                        <Globe className="w-4 h-4 text-teal-500" />
                        <span>Portfolio URL</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://myportfolio.com"
                          {...field}
                          className="bg-white/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Preference</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white/50">
                            <SelectValue placeholder="Select job preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fulltime">Full-time</SelectItem>
                          <SelectItem value="parttime">Part-time</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="resumeLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-teal-500" />
                        <span>Resume Link</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://myresume.com"
                          {...field}
                          className="bg-white/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-teal-500" />
                        <span>Experience</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Briefly describe your relevant work experience..."
                          className="resize-none bg-white/50"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
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
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Job Alerts</FormLabel>
                        <FormDescription>
                          Receive notifications about new job opportunities
                          matching your profile.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <CardFooter className="flex justify-end px-0">
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
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
