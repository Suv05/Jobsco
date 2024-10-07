import RJobUI from "@/components/Recutor-Listed-JobUI/RJobUI";
import { fetchRJobs, fetchAppliedCandidates } from "@/actions/Job-Action-By-Recurtor";
import { auth } from "@clerk/nextjs/server";

async function Page() {
  const { userId } = auth();

  const { data: jobs } = await fetchRJobs(userId);

  // Fetch applied candidates for each job
  const jobsWithCandidates = await Promise.all(
    jobs.map(async (job) => {
      const { data: candidates } = await fetchAppliedCandidates(userId, job._id);
      return { ...job, candidates };
    })
  );

  return (
    <>
      <RJobUI jobs={jobsWithCandidates} />
    </>
  );
}

export default Page;
