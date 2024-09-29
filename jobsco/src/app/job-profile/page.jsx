import { auth } from "@clerk/nextjs/server";

import JobProfile from "@/components/Job-Profile-UI/Jobprofile";

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

  const { data: user } = await fetchCandidateInfo(userId);
  const { data: totalSavedJobs } = await countSavedJobs(userId);
  const { data: totalJobsApplied } = await totalNumberOfAppliedJobs(userId);
  const { data: savedJobsByUser } = await getAllSavedJobs(userId);
  const { data: appliedJobs } = await fetchAllAppliedJobs(userId);

  // Fetch the status for each applied job
  const appliedJobsWithStatus = await Promise.all(
    appliedJobs.map(async (job) => {
      const statusRes = await fetchStatusOfAppliedJob(job._id, userId);
      return {
        ...job,
        status: statusRes.data || "Unknown",
      };
    })
  );

  return (
    <>
      <JobProfile
        user={user}
        saved={totalSavedJobs}
        applied={totalJobsApplied}
        savedJobs={savedJobsByUser}
        appliedJobs={appliedJobsWithStatus} // Pass the updated applied jobs with status
      />
    </>
  );
}
export default Page;
