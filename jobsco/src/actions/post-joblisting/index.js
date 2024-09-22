"use server";

import createConnection from "@/db";
import Job from "@/models/job.model.js";

export async function postJobs(formData) {
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

    // Create a new job entry
    const newJob = await Job.create(formData);

    if (newJob) {
      return {
        status: "success",
        message: "Job created successfully",
      };
    } else {
      return {
        status: "error",
        message: "Job creation failed",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: "error",
      message: "Job creation failed",
    };
  }
}
