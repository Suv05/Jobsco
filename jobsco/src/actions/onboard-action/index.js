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

    const candidate = await Candidate.create(formData);

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
    console.log(error);
    return {
      status: "error",
      message: "Candidate creation failed",
    };
  }
}
