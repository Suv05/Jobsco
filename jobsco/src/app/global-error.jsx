"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-8 text-center">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-red-500 rounded-full opacity-10 animate-ping"></div>
              </div>
              <div className="relative">
                <AlertTriangle className="w-16 h-16 mx-auto text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Oops! Something went wrong
            </h1>
            <p className="text-xl text-gray-400">
              We&apos;ve encountered an unexpected error.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Error Details</h2>
            <p className="text-gray-400 mb-4">
              {error.message || "An unknown error occurred"}
            </p>
            {error.digest && (
              <p className="text-sm text-gray-500">
                Error ID:{" "}
                <code className="bg-gray-700 px-1 py-0.5 rounded">
                  {error.digest}
                </code>
              </p>
            )}
          </div>
          <div className="space-y-4">
            <button
              onClick={() => reset()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try again
            </button>
            <p className="text-sm text-gray-400">
              If the problem persists, please contact our support team.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
