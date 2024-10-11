import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800 text-foreground p-4">
      <div className="text-center space-y-6 max-w-md">
        <Image
          src="/notfound.png"
          alt="404 - Page Not Found"
          width={500} // Replace with actual image width
          height={500} // Replace with actual image height
          className="w-1/2 mx-auto"
        />

        <p className="text-xl text-muted-foreground">
          Oops! The page you&apos;re looking for seems to have vanished into
          thin air.
        </p>
        <div className="bg-secondary p-4 rounded-lg text-secondary-foreground">
          <p className="text-sm">
            Don&apos;t worry, there are plenty of other great opportunities
            waiting for you on our platform.
          </p>
        </div>
        <Button asChild className="mt-8">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
