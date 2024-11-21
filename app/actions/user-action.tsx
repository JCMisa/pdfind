"use server";

import { db } from "@/utils/db";
import { User } from "@/utils/schema";
import { eq } from "drizzle-orm";

export const addUser = async (
  userId: string,
  name: string,
  userEmail: string,
  imageUrl: string,
  createdAt: string
) => {
  try {
    // check first if there is an existing user
    const existingUser = await db
      .select()
      .from(User)
      .where(eq(User.email, userEmail));

    if (existingUser?.length === 0) {
      // if the logged in user is not in the database yet, then add
      await db.insert(User).values({
        userId: userId,
        name: name,
        email: userEmail,
        imageUrl: imageUrl,
        createdAt: createdAt,
      });
    }
  } catch (error) {
    console.log("add user error: ", error);
  }
};
