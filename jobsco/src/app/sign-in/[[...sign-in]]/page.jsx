import { SignIn } from "@clerk/nextjs";

export default function Signin() {
  return (
    <div className="flex justify-center items-center min-h-screen mt-5">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
}
