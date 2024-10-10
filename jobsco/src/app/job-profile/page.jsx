import JobProfile from "@/components/Job-Profile-UI/Jobprofile";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

//actions
import { fetchCandidateInfo } from "@/actions/Fetch-R&C-Info-Action";
import { countSavedJobs, getAllSavedJobs } from "@/actions/Saved-Job-Action";
import {
  totalNumberOfAppliedJobs,
  fetchAllAppliedJobs,
  fetchStatusOfAppliedJob,
} from "@/actions/Apply-For-Job-Action";

async function Page() {
  const { userId } = auth();
  const user = await currentUser();

  // Direct role check
  const isCandidate = user?.unsafeMetadata?.role === "candidate";

  if (!isCandidate) {
    redirect("/");
    return null; // Ensure to return null to avoid further processing
  }

  const { data: userDetails } = await fetchCandidateInfo(userId);
  const { data: totalSavedJobs } = await countSavedJobs(userId);
  const { data: totalJobsApplied } = await totalNumberOfAppliedJobs(userId);
  const { data: savedJobsByUser } = await getAllSavedJobs(userId);
  const { data: appliedJobs } = await fetchAllAppliedJobs(userId);

  // Check if appliedJobs exists and is an array before proceeding
  const appliedJobsWithStatus =
    appliedJobs && appliedJobs.length > 0
      ? await Promise.all(
          appliedJobs.map(async (job) => {
            const statusRes = await fetchStatusOfAppliedJob(job._id, userId);
            return {
              ...job,
              status: statusRes.data || "Unknown",
            };
          })
        )
      : []; // If no jobs have been applied for, return an empty array

  return (
    <>
      <JobProfile
        userDetails={userDetails}
        saved={totalSavedJobs}
        applied={totalJobsApplied}
        savedJobs={savedJobsByUser}
        appliedJobs={appliedJobsWithStatus} // Pass the updated applied jobs with status
      />
    </>
  );
}

export default Page;
