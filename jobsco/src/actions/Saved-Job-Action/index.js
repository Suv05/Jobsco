"use server";

import mongoose from "mongoose";
import createConnection from "@/db";
import Job from "@/models/job.model.js";
import SavedJobs from "@/models/savedJobs.model.js";
import { revalidatePath } from "next/cache";

export async function saveJob(jobId, userId) {
  try {
    await createConnection();

    const savedJobs = await SavedJobs.findOne({ jobId, userId });

    if (savedJobs) {
      return {
        status: "success",
        message: "Job already saved",
      };
    } else {
      // Convert jobId to ObjectId if necessary
      const job = await Job.findOne({
        _id: new mongoose.Types.ObjectId(jobId),
      });

      if (!job) {
        return {
          status: "error",
          message: "Job not found",
        };
      }

      const jobExpireDate = job.applicationDeadline;

      // Compare the job's application deadline to the current time
      const isActive = new Date(jobExpireDate).getTime() > Date.now();

      const newSavedJob = await SavedJobs.create({
        jobId,
        userId,
        isActive,
      });

      if (newSavedJob) {
        // revalidatePath("/");
        return {
          status: "success",
          message: "Job saved successfully",
        };
      } else {
        return {
          status: "error",
          message: "An error occurred while saving the job",
        };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An error occurred while saving the job",
    };
  }
}

//find all saved jobs
export async function getAllSavedJobs(userId) {
  try {
    await createConnection();

    //find all saved job for the user
    const savedJobs = await SavedJobs.find({ userId });

    if (!savedJobs || savedJobs.length === 0) {
      return {
        status: "error",
        message: "No saved jobs found for the user",
      };
    }

    // Use Promise.all to fetch all jobs details in parallel
    const jobDetails = await Promise.all(
      savedJobs.map(async (item) => {
        return Job.findById(new mongoose.Types.ObjectId(item.jobId));
      })
    );
    
    return {
      status: "success",
      data: jobDetails, // return the array of job objects directly
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An error occurred while fetching all saved jobs",
    };
  }
}

//check if job is saved
export async function checkIfJobIsSaved(jobId, userId) {
  try {
    await createConnection();
    const savedJobs = await SavedJobs.findOne({ jobId, userId });
    if (savedJobs) {
      return {
        status: "saved",
        message: "Job is saved",
      };
    } else {
      return {
        status: "error",
        message: "Job is not saved",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An error occurred while checking if job is saved",
    };
  }
}

//count saved document by user
export async function countSavedJobs(userId) {
  try {
    await createConnection();
    const savedJobs = await SavedJobs.countDocuments({ userId });

    if (savedJobs) {
      return {
        status: "success",
        message: "Count of saved jobs fetched successfully",
        data: JSON.stringify(JSON.parse(savedJobs)),
      };
    } else {
      return {
        status: "error",
        message: "An error occurred while counting saved jobs",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An error occurred while counting saved jobs",
    };
  }
}
