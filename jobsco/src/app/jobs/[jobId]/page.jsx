import Jobid from "@/components/Job-Id/Jobid";
import { fetchSingleJob } from "@/actions/Job-Fetch-Action";
import { checkIfAlreadyApplied } from "@/actions/Apply-For-Job-Action";
import { auth } from "@clerk/nextjs/server";

async function page({ params }) {
  const { userId } = auth();
  const { jobId } = params;
  const { data: job } = await fetchSingleJob(jobId);

  const { status } = await checkIfAlreadyApplied(jobId, userId);

  return (
    <>
      <Jobid jobData={job} isAlreadyApplied={status} />
    </>
  );
}

export default page;
