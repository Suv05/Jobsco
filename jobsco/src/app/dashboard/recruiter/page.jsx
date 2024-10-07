import { currentUser } from "@clerk/nextjs/server";
import { fetchRecuterInfo } from "@/actions/Fetch-R&C-Info-Action";
import { fetchRJobs } from "@/actions/Job-Action-By-Recurtor";
import { fetchNumberOfApplicants } from "@/actions/Apply-For-Job-Action";

import RDashboard from "@/components/Recurtor-Dashboard/RDashboard";

export default async function RecruiterDashboard() {
  const user = await currentUser();
  const { data: recruInfo } = await fetchRecuterInfo(user?.id);
  const { data: recruJobInfo } = await fetchRJobs(user?.id);

  //fetch number of applicants for each job
  const recruiterJobInfoWithApplicants = await Promise.all(
    recruJobInfo.map(async (job) => {
      const applicantsResponse = await fetchNumberOfApplicants(job._id);
      const applicantsCount =
        applicantsResponse.status === "success" ? applicantsResponse.data : 0;

      return {
        ...job,
        applicantsCount, // Add the number of applicants to each job
      };
    })
  );

  return (
    <>
      <RDashboard
        recruiterInfo={recruInfo}
        recruiterJobInfo={recruiterJobInfoWithApplicants}
      />
    </>
  );
}
