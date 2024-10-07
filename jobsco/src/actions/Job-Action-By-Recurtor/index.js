"use server";

import createConnection from "@/db";
import AppliedJob from "@/models/appliedJob.model.js";
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

//fetch single job listing data first before updating
export async function fetchSingleJob(jobId) {
  try {
    await createConnection();

    // Fetch single job from the database
    const job = await Job.findOne({ _id: jobId });

    if (job) {
      return {
        status: "success",
        data: JSON.parse(JSON.stringify(job)),
      };
    } else {
      return {
        status: "error",
        message: "Failed to fetch job",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to fetch job",
    };
  }
}

//update job data by recurtor
export async function updateRJob(jobId, userId, formData) {
  try {
    // Ensure the MongoDB connection is established
    await createConnection();

    if (!formData) {
      return {
        status: "error",
        message: "Please fill out all the fields",
      };
    }

    // Map 'skills' to 'skillsRequired'
    formData.skillsRequired = formData.skills;
    delete formData.skills;

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

//Now we have to fetch all candidates details applied for a job to the recurtor who posted that job
export async function fetchAppliedCandidates(recurtorId, jobId) {
  try {
    await createConnection();

    const appliedCandidates = await AppliedJob.find({ jobId, recurtorId });

    if (!appliedCandidates || appliedCandidates.length === 0) {
      return {
        status: "error",
        message: "No candidates have applied for this job.",
      };
    }

    return {
      status: "success",
      data: JSON.parse(JSON.stringify(appliedCandidates)),
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to fetch applied candidates",
    };
  }
}
