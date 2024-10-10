import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800 text-foreground p-4">
      <div className="text-center space-y-6 max-w-md">
        <img
          src="/notfound.png"
          alt="404 - Page Not Found"
          className="w-1/2 mx-auto"
        />
        <p className="text-xl text-muted-foreground">
          Oops! The page you're looking for seems to have vanished into thin
          air.
        </p>
        <div className="bg-secondary p-4 rounded-lg text-secondary-foreground">
          <p className="text-sm">
            Don't worry, there are plenty of other great opportunities waiting
            for you on our platform.
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
