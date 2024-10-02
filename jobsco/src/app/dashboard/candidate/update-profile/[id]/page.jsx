import CandidateinfoUpdate from "@/components/Candidate-Dashboard/CandidateinfoUpdate";
import { fetchCandidateInfo } from "@/actions/Fetch-R&C-Info-Action";
import { auth } from "@clerk/nextjs/server";

async function page() {
  const { userId } = auth();
  const { data: response } = await fetchCandidateInfo(userId);

  return (
    <>
      <CandidateinfoUpdate candidateInfo={response} />
    </>
  );
}

export default page;
