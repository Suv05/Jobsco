import { SignUp } from "@clerk/nextjs";

export default function Signup() {
  return (
    <div className="flex justify-center items-center min-h-screen mt-12">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        forceRedirectUrl="/onboard"
      />
    </div>
  );
}
