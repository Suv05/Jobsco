import CandidateDetailsForm from "@/components/Candidate-Onboard/CandidateDetailsForm";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { validateUser } from "@/actions/Validate-User";

async function Page({}) {
  const user = await currentUser();

  const { status } = await validateUser(user?.id, "candidate");

  if (status === "success") {
    redirect("/dashboard/candidate");
    return null;
  }

  // Direct role check
  const isCanSee = user?.unsafeMetadata?.role === "candidate";

  if (!isCanSee) {
    redirect("/onboard/recruiter");
    return null; // Ensure to return null to avoid further processing
  }
  return (
    <>
      <CandidateDetailsForm />
    </>
  );
}

export default Page;
