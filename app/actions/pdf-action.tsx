/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { parseServerActionResponse } from "@/lib/utils";
import { getUser } from "@/utils/auth";
import { db } from "@/utils/db";
import { storage } from "@/utils/firebaseConfig";
import { Note } from "@/utils/schema";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export const uploadPdf = async (formValues: any) => {
  const user = await getUser();

  try {
    // get the viewable url of pdf from firebase storage
    const fileName = formValues.pdfFile.name;
    const storageRef = ref(storage, "pdfind/" + fileName);
    await uploadBytes(storageRef, formValues.pdfFile).then(() => {
      console.log("upload file complete");
    });

    // add the pdf title and file
    const noteId = uuidv4();
    const result = await db.insert(Note).values({
      noteId: noteId,
      userId: user?.id as string,
      pdfTitle: formValues?.noteTitle,
      pdfUrl: await getDownloadURL(storageRef),
      createdBy: user?.primaryEmailAddress?.emailAddress as string,
      createdAt: moment().format("MM-DD-YYYY"),
    });
    if (result) {
      return parseServerActionResponse({
        status: "SUCCESS",
      });
    }
  } catch (error) {
    console.log("Upload PDF Error: ", error);
    return parseServerActionResponse({
      status: "ERROR",
    });
  }
};
