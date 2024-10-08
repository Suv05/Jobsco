import Jobs from "@/components/Jobs-UI/Jobs.jsx";
import { fetchAllJobs } from "@/actions/Job-Fetch-Action";

async function page() {
  const { data: jobs } = await fetchAllJobs();
  return (
    <>
      <Jobs jobs={jobs}/>
    </>
  );
}

export default page;
