import React from "react";

function Progress({filePrec}) {
  return (
    <>
      {/* Progress Bar */}
      {filePrec > 0 && filePrec < 100 && (
        <div className="mb-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Uploading...
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {filePrec}%
                </span>
              </div>
            </div>
            <div className="progress-bar-container mb-4 text-xs flex rounded">
              <div
                className="progress-bar bg-blue-500"
                style={{ width: `${filePrec}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Please be patient, changes may take some time to reflect.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Progress;