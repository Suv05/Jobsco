import JobPostingForm from "@/components/Post-job/JobPostingForm";

import {currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Page({}) {
  const user = await currentUser();

  //role based authorization
  const userRole = user?.unsafeMetadata?.role === "recruiter";

  if (!userRole) redirect("/not-found");
  return (
    <>
      <JobPostingForm />
    </>
  );
}

export default Page;
