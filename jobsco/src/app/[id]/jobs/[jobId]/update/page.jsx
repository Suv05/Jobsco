import Updateform from "@/components/update-form/Updateform";
import { fetchSingleJob } from "@/actions/Job-Action-By-Recurtor";
import { auth, currentUser } from "@clerk/nextjs/server";

async function page({ params }) {
  const user = await currentUser();
  const { has } = auth();

  //role based authorization
  const userRole = user?.unsafeMetadata?.role === "recruiter";
  const canSee = has({ userRole });

  if (!canSee) redirect("/not-found");

  const jobId = params.jobId;

  const { data: fetchData } = await fetchSingleJob(jobId);
  console.log(fetchData);

  return (
    <>
      <Updateform fetchData={fetchData} />
    </>
  );
}

export default page;
