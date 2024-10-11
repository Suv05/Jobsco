"use server";

import createConnection from "@/db";
import PrimiumUser from "@/models/premiumUser.model";

export async function addToPrimium(plan, userId, role) {
  try {
    await createConnection();

    const newPrimiumUser = await PrimiumUser.create({ plan, userId, role });

    if (newPrimiumUser) {
      return {
        status: "success",
        message: "User added to Primimum",
      };
    } else {
      return {
        status: "error",
        message: "User can't added to Primimum",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "User can't added to Primimum",
    };
  }
}

export async function isPrimiumUser(userId) {
  try {
    await createConnection();

    // Use an object to filter by userId
    const checkUser = await PrimiumUser.findOne({ userId });

    if (checkUser) {
      return {
        isPro: "success",
        message: "User is a Premium User",
        plan: checkUser?.plan,
      };
    } else {
      return {
        isPro: "error",
        message: "User is not a Premium User",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      isPro: "error",
      message: "Error occurred while checking premium status",
    };
  }
}
