"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, UserCircle, ChevronRight } from "lucide-react";

const roleData = [
  {
    type: "recruiter",
    title: "Recruiter",
    description: "Post jobs and find the perfect candidates for your company.",
    icon: Briefcase,
    color: "bg-blue-500",
  },
  {
    type: "candidate",
    title: "Job Seeker",
    description: "Explore exciting job opportunities and advance your career.",
    icon: UserCircle,
    color: "bg-green-500",
  },
];

export default function OnboardPage() {
  const [selectedRole, setSelectedRole] = useState(null);

  const { user } = useUser();
  const router = useRouter();

  const handleRoleSelection = async (role) => {
    setSelectedRole(role);

    try {
      //save the selected role to the user's unSafeMetadata
      await user.update({
        unsafeMetadata: {
          role: role,
        },
      });

      //console.log("User role in cleark:", user.unsafeMetadata.role);

      // Redirect to respective dashboard based on the role
      if (role === "recruiter") {
        router.push("/onboard/recruiter");
      } else {
        router.push("/onboard/candidate");
      }
    } catch (err) {
      console.error("Error updating user role:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl overflow-hidden shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <CardTitle className="text-3xl font-bold text-center">
            Welcome to Jobsco 🎊
          </CardTitle>
          <CardDescription className="text-center text-blue-100">
            Let's personalize your experience
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">I am a...</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {roleData.map((role) => (
              <RoleCard
                key={role.type}
                role={role}
                isSelected={selectedRole === role.type}
                onSelect={() => setSelectedRole(role.type)}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center p-6 bg-gray-50">
          <Button
            className="w-full max-w-md"
            size="lg"
            disabled={!selectedRole}
            onClick={() => selectedRole && handleRoleSelection(selectedRole)}
          >
            Continue to Onboarding
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function RoleCard({ role, isSelected, onSelect }) {
  const Icon = role.icon;

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <Card
        className={`cursor-pointer transition-all ${
          isSelected ? "ring-2 ring-blue-500 shadow-lg" : ""
        }`}
        onClick={onSelect}
      >
        <CardHeader>
          <div
            className={`w-16 h-16 rounded-full ${role.color} flex items-center justify-center mx-auto mb-4`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-center text-xl">{role.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">{role.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
