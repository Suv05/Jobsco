import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Building,
  Briefcase,
  GraduationCap,
} from "lucide-react";

export default function RecruiterProfileCard({ recruiterData, isPro }) {
  const initials = recruiterData?.fullName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className="max-w-3xl mx-auto mb-8 bg-gray-800 border-gray-700 overflow-hidden">
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 px-8 pt-8 pb-10">
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-800 shadow-xl overflow-hidden">
            {recruiterData.imageUrl ? (
              <img
                src={recruiterData.imageUrl}
                alt={recruiterData.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-gray-700">
                {initials}
              </span>
            )}
          </div>
          <div>
            <h2 className="flex items-center text-3xl font-bold text-white">
              {recruiterData.fullName}{" "}
              {isPro === "success" ? (
                <Badge variant="primary" className={`ml-1 bg-amber-400`}>
                  Premium
                </Badge>
              ) : (
                ""
              )}
            </h2>
            <p className="text-blue-200 text-lg mt-1">
              {recruiterData.position} at {recruiterData.companyName}
            </p>
          </div>
        </div>
      </div>
      <CardContent className="px-8 py-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-blue-900 text-blue-200">
              {recruiterData.industry}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-purple-900 text-purple-200"
            >
              {recruiterData.joinedYear}
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem
              icon={Building}
              text={recruiterData.companyName}
              label="Company"
            />
            <InfoItem
              icon={Briefcase}
              text={recruiterData.position}
              label="Position"
            />
            <InfoItem
              icon={MapPin}
              text={recruiterData.location}
              label="Location"
            />
            <InfoItem icon={Phone} text={recruiterData.phone} label="Phone" />
            <InfoItem icon={Mail} text={recruiterData.email} label="Email" />
            <InfoItem
              icon={GraduationCap}
              text={recruiterData.education || "Not specified"}
              label="Education"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const InfoItem = ({ icon: Icon, text, label }) => (
  <div className="flex items-center space-x-2">
    <Icon className="h-5 w-5 text-blue-400" />
    <div>
      <p className="text-sm font-medium text-gray-400">{label}</p>
      <p className="text-sm text-gray-200">{text}</p>
    </div>
  </div>
);
