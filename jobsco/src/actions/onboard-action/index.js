"use server";

import createConnection from "@/db";
import Recuter from "@/models/recuter.model.js";
import Candidate from "@/models/candidate.model.js";

//post req for recurator details form
export async function createRecuter(formData) {
  try {
    await createConnection();

    const recuter = await Recuter.create(formData);

    if (recuter) {
      return {
        status: "success",
        message: "Recuter created successfully",
      };
    } else {
      return {
        status: "error",
        message: "Recuter creation failed",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Recuter creation failed",
    };
  }
}

//post requset to candidate details form
export async function createCandidate(formData) {
  try {
    await createConnection();

    console.log("Received formData:", formData);

    const transformedData = {
      ...formData,
    };

    const candidate = await Candidate.create(transformedData);

    if (candidate) {
      return {
        status: "success",
        message: "Candidate created successfully",
      };
    } else {
      return {
        status: "error",
        message: "Candidate creation failed",
      };
    }
  } catch (error) {
    console.error("Error creating candidate:", error);
    if (error.name === "ValidationError") {
      // Handle specific validation errors
      const errors = Object.values(error.errors).map((err) => err.message);
      return {
        status: "error",
        message: "Validation failed: " + errors.join(", "),
      };
    }
    return { status: "error", message: "Candidate creation failed" };
  }
}

//update candidate info

//step-1:first fetch the candidate from the database
//step-2:then update the candidate

export async function updateCandidate(userId, formData) {
  try {
    await createConnection();

    // Find the candidate by userId and update
    const candidate = await Candidate.findOneAndUpdate(
      { userId: userId }, // Query: finding the candidate by userId
      formData, // The data to update
      { new: true } // Option: return the updated document
    );

    if (candidate) {
      return {
        status: "success",
        message: "Candidate updated successfully",
      };
    } else {
      return {
        status: "error",
        message: "Candidate not found",
      };
    }
  } catch (error) {
    console.error("Error updating candidate:", error);

    if (error.name === "ValidationError") {
      // Handle specific validation errors
      const errors = Object.values(error.errors).map((err) => err.message);
      return {
        status: "error",
        message: "Validation failed: " + errors.join(", "),
      };
    }

    return { status: "error", message: "Candidate update failed" };
  }
}
