import JobPostingForm from "@/components/Post-job/JobPostingForm";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Page({}) {
  const user = await currentUser();
  const { has } = auth();

  //role based authorization
  const userRole = user?.unsafeMetadata?.role === "recruiter";
  const canSee = has({ userRole });

  if (!canSee) redirect("/not-found");
  return (
    <>
      <JobPostingForm />
    </>
  );
}

export default Page;
