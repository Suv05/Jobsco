import { currentUser } from "@clerk/nextjs/server";
import { fetchCandidateInfo } from "@/actions/Fetch-R&C-Info-Action";
import { totalNumberOfAppliedJobs } from "@/actions/Apply-For-Job-Action";
import { countSavedJobs } from "@/actions/Saved-Job-Action";
import CDashboard from "@/components/Candidate-Dashboard/CDashboard";

async function CandidateDashboard() {
  const user = await currentUser();
  const { data: candidateInfo } = await fetchCandidateInfo(user?.id);
  const { data: totaljobsApplied } = await totalNumberOfAppliedJobs(user?.id);
  const { data: totalSavedJobs } = await countSavedJobs(user?.id);

  return (
    <CDashboard
      candidateInfo={candidateInfo}
      totalJobs={totaljobsApplied}
      savedJobs={totalSavedJobs}
    />
  );
}

export default CandidateDashboard;
