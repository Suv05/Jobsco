'use client'

import { useEffect } from 'react'
import { ServerCrash, RefreshCw, Home } from 'lucide-react'

export default function Error500() {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('500 - Server-side error occurred')
  }, [])

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-yellow-500 rounded-full opacity-10 animate-pulse"></div>
            </div>
            <div className="relative">
              <ServerCrash className="w-16 h-16 mx-auto text-yellow-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">500 - Server Error</h1>
          <p className="text-xl text-gray-400">Oops! Something went wrong on our end.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">What happened?</h2>
          <p className="text-gray-400 mb-4">
            Our server encountered an unexpected condition that prevented it from fulfilling your request.
          </p>
          <p className="text-sm text-gray-500">
            Error Code: <code className="bg-gray-700 px-1 py-0.5 rounded">500</code>
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Refresh Page
            </button>
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </a>
          </div>
          <p className="text-sm text-gray-400">
            If the problem persists, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  )
}