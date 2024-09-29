"use server";

import createConnection from "@/db";
import AppliedJob from "@/models/appliedJob.model.js";
import Candidate from "@/models/candidate.model";
import Job from "@/models/job.model";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function applyForJob(jobId, userId, data) {
  try {
    await createConnection();

    // Fetch recruiter ID from jobId
    const job = await Job.findById(jobId).select("userRef");
    if (!job) {
      return {
        status: "error",
        message: "Job not found",
      };
    }
    const recruiterId = job?.userRef;

    // Fetch candidate data
    const candidate = await Candidate.findOne({ userId }).select(
      "fullName email"
    );

    if (!candidate) {
      return {
        status: "error",
        message: "Candidate not found",
      };
    }
    const userName = candidate?.fullName;
    const userEmail = candidate?.email;

    // Create applied job
    const appliedJob = await AppliedJob.create({
      jobId,
      userId,
      recurtorId: recruiterId,
      resume: data?.resume,
      userName,
      userEmail,
      status: data?.status || "applied", // Ensure a default if not provided
    });

    if (appliedJob) {
      // Optionally revalidate paths if required
      revalidatePath(`/jobs/${jobId}`);

      return {
        status: "success",
        message: "Applied successfully",
      };
    } else {
      return {
        status: "error",
        message: "Can't apply for the job right now",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An error occurred while applying for the job",
    };
  }
}

export async function checkIfAlreadyApplied(jobId, userId) {
  try {
    await createConnection();

    //Fetch applied job from userId
    const appliedJob = await AppliedJob.findOne({ jobId, userId });

    if (appliedJob) {
      return {
        status: "success",
        message: "You have already applied for this job",
      };
    } else {
      return {
        status: "error",
        message: "You have not applied for this job",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message:
        "An error occurred while checking if you have applied for the job",
    };
  }
}

export async function totalNumberOfAppliedJobs(userId) {
  try {
    await createConnection();
    const totalNumberOfAppliedJobs = await AppliedJob.countDocuments({
      userId,
    });
    return {
      status: "success",
      data: JSON.stringify(JSON.parse(totalNumberOfAppliedJobs)),
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message:
        "An error occurred while checking if you have applied for the job",
    };
  }
}

//fetch all applied jobs for a user
export async function fetchAllAppliedJobs(userId) {
  try {
    await createConnection();

    const appliedJobs = await AppliedJob.find({ userId }).lean();

    if (!appliedJobs || appliedJobs.length === 0) {
      return {
        status: "error",
        message: "No applied jobs found for the user",
      };
    }

    // Fetch all job details based on applied jobs
    const allAppliedJobs = await Promise.all(
      appliedJobs.map(async (item) => {
        const job = await Job.findById(
          new mongoose.Types.ObjectId(item.jobId)
        ).lean(); // Convert Mongoose doc to plain JS object
        return job;
      })
    );

    return {
      status: "success",
      data: allAppliedJobs, // Pass plain JS objects
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An error occurred while fetching all applied jobs",
    };
  }
}

//fetch status of  applied job by user
export async function fetchStatusOfAppliedJob(jobId, userId) {
  try {
    await createConnection();

    //Fetch applied job from userId
    const appliedJob = await AppliedJob.findOne({ jobId, userId });

    if (!appliedJob) {
      return {
        status: "error",
        message: "Applied job not found",
      };
    }

    const status = appliedJob.status;

    return {
      status: "success",
      data: status,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An error occurred while fetching status of applied job",
    };
  }
}
