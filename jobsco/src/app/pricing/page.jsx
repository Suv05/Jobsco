import Pricing from "@/components/Pricing-UI/Pricing";
import { currentUser } from "@clerk/nextjs/server";
import { isPrimiumUser } from "@/actions/Add-To-Premium";

export default async function page() {
  const user = await currentUser();
  const role=user?.unsafeMetadata.role

  const { plan } = await isPrimiumUser(user?.id);
  return (
    <>
      <Pricing role={role} whichPlan={plan} />
    </>
  );
}
