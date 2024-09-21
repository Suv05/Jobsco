import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Building, Briefcase } from "lucide-react"

export default function RecutorProfileCard({ recruiterData }) {
  return (
    <Card className="mb-6 w-full max-w-3xl mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardTitle className="text-2xl font-bold">
          {recruiterData.fullName}
        </CardTitle>
        <p className="text-sm opacity-80 capitalize">
          {recruiterData.position} at {recruiterData.companyName}
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
          <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
            <AvatarImage
              src="/placeholder-user.jpg"
              alt={recruiterData.fullName}
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
              {recruiterData.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <InfoItem
              icon={Building}
              label="Company"
              value={recruiterData.companyName}
            />
            <InfoItem
              icon={Briefcase}
              label="Industry"
              value={recruiterData.industry}
            />
            <InfoItem icon={Mail} label="Email" value={recruiterData.email} />
            <InfoItem
              icon={Phone}
              label="Phone"
              value={recruiterData.phone}
            />
            <InfoItem
              icon={MapPin}
              label="Location"
              value={recruiterData.location}
            />
            <div>
              <p className="text-sm font-medium text-gray-500">Joined</p>
              <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-800">
                {recruiterData.joinedYear}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start space-x-2">
    <Icon className="h-5 w-5 text-blue-500 mt-0.5" />
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-sm text-gray-900">{value}</p>
    </div>
  </div>
)