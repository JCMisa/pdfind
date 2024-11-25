/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useActionState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { uploadPdf } from "@/app/actions/pdf-action";
import { toast } from "sonner";
import axios from "axios";

const UploadPdf = () => {
  const handleSubmit = async (prevState: unknown, formData: FormData) => {
    try {
      const formValues = {
        noteTitle: formData.get("noteTitle") as string,
        pdfFile: formData.get("pdfFile") as any,
      };

      const result = await uploadPdf(formValues);

      if (result?.status === "SUCCESS") {
        toast(
          <p className="text-sm font-bold text-green-500">
            PDF uploaded successfully
          </p>
        );
      }

      return {
        noteTitle: formValues.noteTitle,
      };
    } catch (error) {
      console.log("Upload PDF Error: ", error);
      toast(
        <p className="text-sm font-bold text-red-500">
          Internal error occured while uploading PDF file
        </p>
      );
      return {
        noteTitle: formData.get("noteTitle"),
      };
    }
  };

  const [state, formAction, isPending] = useActionState(
    handleSubmit,
    undefined
  );

  const getParsedPdf = async () => {
    const apiResp = await axios.get(`/api/pdf-loader`);

    if (apiResp?.data?.status === "SUCCESS") {
      console.log("LANGCHAIN PDF PARSED RESULT: ", apiResp?.data?.result);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full text-dark-100">+ Upload PDF</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Your PDF</DialogTitle>
          <DialogDescription>
            Easily upload your PDFs to PDFind and enhance your note-taking
            experience with our seamless integration!
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="my-5 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-400">Note Title</p>
              <Input
                name="noteTitle"
                type="text"
                placeholder="e.g. My First Note"
                required
                defaultValue={state?.noteTitle as string}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-400">PDF File</p>
              <Input
                name="pdfFile"
                type="file"
                accept="application/pdf"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                "Upload"
              )}
            </Button>
            <Button onClick={() => getParsedPdf()}>TEST API CALL</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPdf;
