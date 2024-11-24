"use server";

import { parseServerActionResponse } from "@/lib/utils";
import { getUser } from "@/utils/auth";
import { db } from "@/utils/db";
import { Note } from "@/utils/schema";
import { eq } from "drizzle-orm";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export const createPdfTitle = async (pdfName: string) => {
  const user = await getUser();
  try {
    const noteId = uuidv4();
    const result = await db.insert(Note).values({
      noteId: noteId,
      userId: user?.id as string,
      pdfTitle: pdfName,
      pdfUrl: "",
      createdBy: user?.primaryEmailAddress?.emailAddress as string,
      createdAt: moment().format("MM-DD-YYYY"),
    });
    if (result) {
      return parseServerActionResponse({
        noteId: noteId,
        status: "SUCCESS",
      });
    }
  } catch (error) {
    console.log("Create PDF Title Error: ", error);
    return parseServerActionResponse({
      status: "ERROR",
    });
  }
};

export const updatePdfUrl = async (url: string, noteId: string) => {
  try {
    const result = await db
      .update(Note)
      .set({
        pdfUrl: url,
      })
      .where(eq(Note.noteId, noteId));
    if (result) {
      return parseServerActionResponse({
        status: "SUCCESS",
      });
    }
  } catch (error) {
    console.log("Update PDF URL Error: ", error);
    return parseServerActionResponse({
      status: "ERROR",
    });
  }
};
