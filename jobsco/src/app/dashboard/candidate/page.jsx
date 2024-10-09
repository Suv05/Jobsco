import { currentUser } from "@clerk/nextjs/server";
import { fetchCandidateInfo } from "@/actions/Fetch-R&C-Info-Action";
import { totalNumberOfAppliedJobs } from "@/actions/Apply-For-Job-Action";
import { countSavedJobs } from "@/actions/Saved-Job-Action";
import { isPrimiumUser } from "@/actions/Add-To-Premium";
import CDashboard from "@/components/Candidate-Dashboard/CDashboard";

async function CandidateDashboard() {
  const user = await currentUser();
  const { data: candidateInfo } = await fetchCandidateInfo(user?.id);
  const { data: totaljobsApplied } = await totalNumberOfAppliedJobs(user?.id);
  const { data: totalSavedJobs } = await countSavedJobs(user?.id);
  const { isPro } = await isPrimiumUser(user?.id);

  return (
    <CDashboard
      candidateInfo={candidateInfo}
      totalJobs={totaljobsApplied}
      savedJobs={totalSavedJobs}
      isPro={isPro}
    />
  );
}

export default CandidateDashboard;
