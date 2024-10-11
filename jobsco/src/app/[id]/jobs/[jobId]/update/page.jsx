import Updateform from "@/components/update-form/Updateform";
import { fetchSingleJob } from "@/actions/Job-Action-By-Recurtor";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function page({ params }) {
  const user = await currentUser();

  //role based authorization
  const userRole = user?.unsafeMetadata?.role === "recruiter";

  if (!userRole) redirect("/not-found");

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
