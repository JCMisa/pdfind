"use client";

import { createPdfTitle } from "@/app/actions/pdf-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parseServerActionResponse } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useActionState } from "react";
import { toast } from "sonner";

const UploadPdfPage = () => {
  const router = useRouter();

  const handleSubmit = async (prevState: unknown, formData: FormData) => {
    try {
      const formValues = {
        pdfName: formData.get("pdfTitle") as string,
      };
      const result = await createPdfTitle(formValues.pdfName);
      if (result?.status === "SUCCESS") {
        toast(
          <p className="text-sm font-bold text-green-500">
            PDF title created succesfully
          </p>
        );
        router.push(`/dashboard/uploadPdf/${result?.noteId}`);
        return parseServerActionResponse({
          data: formValues.pdfName,
          error: "",
          status: "SUCCESS",
        });
      }
    } catch (error) {
      console.log(error);
      toast(
        <p className="text-sm font-bold text-red-500">
          An unexpected error has occured
        </p>
      );
      return parseServerActionResponse({
        data: formData?.get("pdfTitle") as string,
        error: "An unexpected error has occured",
        status: "ERROR",
      });
    }
  };

  const [state, formAction, isPending] = useActionState(
    handleSubmit,
    undefined
  );

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen -mt-20 w-full">
      <div>
        <h2 className="text-xl font-bold">Create Your PDF Title</h2>
        <p className="text-sm text-gray-400">
          Give your PDF a captivating title before uploading it to PDFind, your
          ultimate note-taking app!
        </p>
      </div>
      <form action={formAction} className="w-[70%]">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-400">PDF Title</p>
          <Input
            type="text"
            placeholder="e.g. My First Note"
            name="pdfTitle"
            required
            defaultValue={state?.data}
          />
        </div>
        <Button
          type="submit"
          className="text-dark mt-2 w-52 float-right"
          disabled={isPending}
        >
          {isPending ? (
            <LoaderCircle className="w-4 h-4 animate-spin" />
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </div>
  );
};

export default UploadPdfPage;
