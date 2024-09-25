import Updateform from "@/components/update-form/Updateform";
import { fetchSingleJob } from "@/actions/fetch-Rjobs";

async function page({ params }) {
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
