import createConnection from "@/db";
import Job from "@/models/job.model.js";
import { revalidatePath } from "next/cache";

export async function fetchAllJobs() {
  try {
    await createConnection();

    const jobs = await Job.find({});

    if (jobs) {
      // Use the actual userId in the path
      revalidatePath(`/jobs`);

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
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to fetch jobs",
    };
  }
}

//fectch count nummber of jobs 
export async function fetchCountJobs() {
  try {
    await createConnection();

    const jobs = await Job.find({}).limit(6);

    if (jobs) {
      // Use the actual userId in the path
      revalidatePath(`/`);

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
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to fetch jobs",
    };
  }
}


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