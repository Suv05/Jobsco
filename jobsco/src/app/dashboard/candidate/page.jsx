import { currentUser, auth } from "@clerk/nextjs/server";
import { validateUser } from "@/actions/Validate-User";
import { fetchCandidateInfo } from "@/actions/Fetch-R&C-Info-Action";
import { totalNumberOfAppliedJobs } from "@/actions/Apply-For-Job-Action";
import { countSavedJobs } from "@/actions/Saved-Job-Action";
import { isPrimiumUser } from "@/actions/Add-To-Premium";
import CDashboard from "@/components/Candidate-Dashboard/CDashboard";
import { redirect } from "next/navigation";

async function CandidateDashboard() {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId) {
    // If the user is not signed in or signed up, do nothing
    redirect("/signin");
  }

  const role = user?.unsafeMetadata?.role;

  if (!role) {
    // If no role is assigned, redirect to onboard page
    redirect("/onboard");
  }

  // Validate user based on role
  const { status } = await validateUser(userId, role);

  if (status === "error") {
    // If user has no valid data, redirect to the respective fill-details page
    redirect(`/onboard/${role}`);
  }

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
