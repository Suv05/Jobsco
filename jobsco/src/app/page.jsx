import Homepage from "@/components/home/Homepage";
import { fetchCountJobs } from "@/actions/Job-Fetch-Action";
import { auth, currentUser } from "@clerk/nextjs/server";
import { validateUser } from "@/actions/Validate-User";
import { redirect } from "next/navigation";

async function Home() {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId) {
    // If the user is not signed in or signed up, do nothing
    return <Homepage jobs={[]} />;
  }

  const role = user?.unsafeMetadata?.role;

  if (!role) {
    // If no role is assigned, redirect to onboard page
    redirect("/onboard");
  }

  // Validate user based on role
  const { status } = await validateUser(userId, role);

  if (status === "error") {
    // If user has no valid data, redirect to the respective fill-details page
    redirect(`/onboard/${role}`);
  }

  const { data: jobs } = await fetchCountJobs();

  return (
    <>
      <Homepage jobs={jobs} />
    </>
  );
}

export default Home;
