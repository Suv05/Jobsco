"use client";

//react and animation
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

//icons
import {
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  GraduationCap,
  Mail,
  Upload,
  Check,
} from "lucide-react";

//firebase
import { app } from "../../firebase.js";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";

import Progress from "../ui/progressBar";
import { applyForJob } from "@/actions/Apply-For-Job-Action/index.js";
import { useRouter } from "next/navigation.js";

export default function Jobid({ jobData, isAlreadyApplied }) {
  const { user } = useSelector((state) => state.user);

  const router = useRouter();

  const [isApplied, setIsApplied] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [filePrec, setFilePrec] = useState(0);
  const lastUpdate = useRef(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const storage = getStorage(app); //get storage from firebase
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);

      //upload file to firebase storage
      const uploadTask = uploadBytesResumable(storageRef, file);

      //monitor upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          // Throttle the updates to improve UI rendering
          const now = Date.now();
          if (now - lastUpdate.current > 50) {
            // Update every 50ms
            setFilePrec(Math.floor(progress));
            lastUpdate.current = now;
          }
        },
        (error) => {
          console.log("upload error", error);
        },
        () => {
          //get download url when upload is complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setSelectedFile(downloadURL);
            setFilePrec(0); // Reset progress after complete
          });
        }
      );
    }
  };

  async function handleApply() {
    setIsApplied(true);

    const jobId = jobData._id;
    const userId = user;
    const data = {
      resume: selectedFile,
      status: "applied",
    };

    const response = await applyForJob(jobId, userId, data);

    if (response.status === "success") {
      router.push(`/dashboard/candidate`);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden"
      >
        <div className="md:flex">
          <div className="md:shrink-0 bg-blue-600 p-6 flex items-center justify-center">
            <img
              className="h-20 w-20 object-contain"
              src={jobData.companyLogo}
              alt={jobData.company}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-lg text-blue-400 font-semibold mb-1">
              {jobData.company}
            </div>
            <h1 className="text-3xl font-light text-gray-100 mb-2">
              {jobData.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-6">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 capitalize" />
                {jobData.location}
              </div>
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1 capitalize" />
                {jobData.jobType}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(jobData.applicationDeadline).toLocaleDateString()}
              </div>
            </div>
            <p className="mt-2 text-gray-300">{jobData.description}</p>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-2">
                Job Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-400" />
                  <span className="text-gray-300 capitalize">
                    Experience: {jobData.experienceLevel}
                  </span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-blue-400" />
                  <span className="text-gray-300 capitalize">
                    Education: {jobData.educationRequirements}
                  </span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-blue-400" />
                  <span className="text-gray-300">
                    Contact: {jobData.contactEmail}
                  </span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-blue-400" />
                  <span className="text-gray-300 capitalize">
                    Industry: {jobData.industry}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-2">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {jobData.skillsRequired.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-900 text-blue-200 text-sm font-medium px-2.5 py-0.5 rounded-md capitalize"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-2">
                Benefits
              </h2>
              <ul className="list-disc list-inside text-gray-300 capitalize">
                {jobData.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleApply}
                className={`px-6 py-2 rounded-md text-white font-semibold transition-colors duration-300 ${
                  isApplied || isAlreadyApplied === "success"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={!selectedFile}
              >
                {isApplied || isAlreadyApplied === "success" ? (
                  <span className="flex items-center justify-center">
                    <img
                      src="/check.png"
                      alt="check"
                      className="mr-2 h-5 w-5"
                    />
                    Applied
                  </span>
                ) : (
                  "Apply Now"
                )}
              </button>
              {isAlreadyApplied === "success" ? (
                ""
              ) : (
                <label className="flex items-center justify-center px-6 py-2 bg-gray-700 text-gray-200 rounded-md cursor-pointer hover:bg-gray-600 transition-colors duration-300">
                  <Upload className="h-5 w-5 mr-2" />
                  {selectedFile ? (
                    <>
                      <p> Uploaded Successfully</p>
                      <img
                        src="/check.png"
                        alt="check"
                        className="ml-2 h-5 w-5"
                      />
                    </>
                  ) : (
                    "Upload Resume"
                  )}
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                </label>
              )}

              {/* Progress Bar */}
              <Progress filePrec={filePrec} />
            </div>
            {isAlreadyApplied === "success" ? (
              <p className="text-xs text-green-400 mt-2">
                You have already applied for this job
              </p>
            ) : (
              <p className="text-xs text-red-400 mt-2">
                Note: Upload your resume before applying
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
    </>
  );
}
