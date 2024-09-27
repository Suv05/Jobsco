import Homepage from "@/components/home/Homepage";
import { fetchAllJobs } from "@/actions/Job-Fetch-Action";

async function Home() {
  const { data: jobs } = await fetchAllJobs();

  return (
    <>
      <Homepage jobs={jobs} />
    </>
  );
}

export default Home;
