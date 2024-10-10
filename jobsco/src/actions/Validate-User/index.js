import createConnection from "@/db";
import Recuter from "@/models/recuter.model.js";
import Candidate from "@/models/candidate.model.js";

export async function validateUser(userId, role) {
  try {
    await createConnection();

    if (role === "recruiter") {
      const user = await Recuter.findOne({ userId });

      if (user) {
        return {
          status: "success",
          message: "User is a Recruiter",
        };
      } else {
        return {
          status: "error",
          message: "User is not a Recruiter",
        };
      }
    } else if (role === "candidate") {
      const user = await Candidate.findOne({ userId });

      if (user) {
        return {
          status: "success",
          message: "User is a Candidate",
        };
      } else {
        return {
          status: "error",
          message: "User is not a Candidate",
        };
      }
    } else {
      return {
        status: "error",
        message: "User is not a Recruiter or Candidate",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Error occurred while validating user",
    };
  }
}
