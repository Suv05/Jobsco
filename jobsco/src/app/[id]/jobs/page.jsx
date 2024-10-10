import RJobUI from "@/components/Recutor-Listed-JobUI/RJobUI";
import {
  fetchRJobs,
  fetchAppliedCandidates,
} from "@/actions/Job-Action-By-Recurtor";
import { auth, currentUser } from "@clerk/nextjs/server";

async function Page() {
  const { userId, has } = auth();
  const user = await currentUser();

  //role based authorization
  const userRole = user?.unsafeMetadata?.role === "recruiter";
  const canSee = has({ userRole });

  if (!canSee) redirect("/not-found");

  const { data: jobs } = await fetchRJobs(userId);

  // Fetch applied candidates for each job
  const jobsWithCandidates = await Promise.all(
    jobs.map(async (job) => {
      const { data: candidates } = await fetchAppliedCandidates(
        userId,
        job._id
      );
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
