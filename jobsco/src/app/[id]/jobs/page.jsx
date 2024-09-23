import RJobUI from "@/components/Recutor-Listed-JobUI/RJobUI";
import { fetchRJobs } from "@/actions/fetch-Rjobs";
import { auth } from "@clerk/nextjs/server";

async function Page() {
  const { userId } = auth();

  const { data: jobs } = await fetchRJobs(userId);

  return (
    <>
      <RJobUI jobs={jobs} />
    </>
  );
}

export default Page;
