import RecruiterDetailsForm from "@/components/Recurtor-Onboard/RecruiterDetailsForm";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { validateUser } from "@/actions/Validate-User";

async function Page({}) {
  const user = await currentUser();

  const { status } = await validateUser(user?.id, "recruiter");

  if (status === "success") {
    redirect("/dashboard/recruiter");
    return null;
  }

  // Direct role check
  const isCanSee = user?.unsafeMetadata?.role === "recruiter";

  if (!isCanSee) {
    redirect("/onboard/candidate");
    return null; // Ensure to return null to avoid further processing
  }
  return (
    <>
      <RecruiterDetailsForm />
    </>
  );
}

export default Page;
