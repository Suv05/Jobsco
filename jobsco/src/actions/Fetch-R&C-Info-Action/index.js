import createConnection from "@/db";
import Recuter from "@/models/recuter.model.js";
import Candidate from "@/models/candidate.model.js";

export async function fetchRecuterInfo(userId) {
  try {
    await createConnection();

    const recuter = await Recuter.findOne({ userId });

    if (recuter) {
      return {
        status: "success",
        message: "Recuter info fetched successfully",
        data: JSON.parse(JSON.stringify(recuter)),
      };
    } else {
      return {
        status: "error",
        message: "Recuter info fetch failed",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Recuter info fetch failed",
    };
  }
}

//fetch candidate info
export async function fetchCandidateInfo(userId) {
  try {
    await createConnection();

    const candidate = await Candidate.findOne({ userId });

    if (candidate) {
      return {
        status: "success",
        message: "Candidate info fetched successfully",
        data: JSON.parse(JSON.stringify(candidate)),
      };
    } else {
      return {
        status: "error",
        message: "Candidate info fetch failed",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Candidate info fetch failed",
    };
  }
}
