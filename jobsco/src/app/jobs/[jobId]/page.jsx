import Jobid from "@/components/Job-Id/Jobid";
import { fetchSingleJob } from "@/actions/Job-Fetch-Action";
import { checkIfAlreadyApplied } from "@/actions/Apply-For-Job-Action";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function page({ params }) {
  const { userId } = auth();
  const user = await currentUser();
  const { jobId } = params;

 
 // Direct role check
 const isCandidate = user?.unsafeMetadata?.role === "candidate";

 if (!isCandidate) {
   redirect("/");
   return null; // Ensure to return null to avoid further processing
 }

  const { data: job } = await fetchSingleJob(jobId);

  const { status } = await checkIfAlreadyApplied(jobId, userId);

  return (
    <>
      <Jobid jobData={job} isAlreadyApplied={status} />
    </>
  );
}

export default page;
