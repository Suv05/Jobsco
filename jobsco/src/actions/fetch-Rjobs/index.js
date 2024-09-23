"use server";

import createConnection from "@/db";
import Job from "@/models/job.model.js";
import { revalidatePath } from "next/cache";

export async function fetchRJobs(userId) {
  try {
    // Ensure the MongoDB connection is established
    await createConnection();

    // Fetch all jobs from the database
    const jobs = await Job.find({ userRef: userId });

    if (jobs) {
      // Use the actual userId in the path
      revalidatePath(`/${userId}/jobs`);

      return {
        status: "success",
        data: JSON.parse(JSON.stringify(jobs)),
      };
    } else {
      return {
        status: "error",
        message: "Failed to fetch jobs",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: "error",
      message: "Failed to fetch jobs",
    };
  }
}

//delete functinality for recruiter

export async function deleteRJob(jobId, userId) {
  try {
    // Ensure the MongoDB connection is established
    await createConnection();

    // Fetch all jobs from the database
    const job = await Job.findOne({ _id: jobId });

    if (job) {
      await Job.deleteOne({ _id: jobId });

      // Revalidate the specific path for this user after job deletion
      revalidatePath(`/${userId}/jobs`);

      return {
        status: "success",
        message: "Job deleted successfully",
      };
    } else {
      return {
        status: "error",
        message: "Failed to delete job",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: "error",
      message: "Failed to delete job",
    };
  }
}

export async function updateRJob(jobId, userId, formData) {
  try {
    // Ensure the MongoDB connection is established
    await createConnection();

    // Fetch all jobs from the database
    const job = await Job.findOne({ _id: jobId });

    if (job) {
      await Job.updateOne({ _id: jobId }, { $set: formData });

      // Revalidate the specific path for this user after job deletion
      revalidatePath(`/${userId}/jobs`);

      return {
        status: "success",
        message: "Job updated successfully",
      };
    } else {
      return {
        status: "error",
        message: "Failed to update job",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: "error",
      message: "Failed to update job",
    };
  }
}
