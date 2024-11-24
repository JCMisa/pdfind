/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { updatePdfUrl } from "@/app/actions/pdf-action";
import { Input } from "@/components/ui/input";
import { storage } from "@/utils/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UploadPdfFile = ({ params }: { params: Promise<{ noteId: string }> }) => {
  const router = useRouter();

  const onFileSelected = async (e: any) => {
    const file = e.target.files[0];
    const fileName = Date.now() + ".pdf";
    const storageRef = ref(storage, "pdfind/" + fileName);
    await uploadBytes(storageRef, file)
      .then(() => {
        console.log("upload file complete");
      })
      .then(() => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          try {
            const result = await updatePdfUrl(
              downloadUrl,
              await params?.then((res) => res.noteId)
            );
            if (result?.status === "SUCCESS") {
              toast(
                <p className="text-sm font-bold text-green-500">
                  PDF file saved successfully
                </p>
              );
              router.push(`/dashboard`);
            }
          } catch {
            toast(
              <p className="text-sm font-bold text-red-500">
                Internal error occured while uploading PDF file
              </p>
            );
          }
        });
      });
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen -mt-20 w-full">
      <div>
        <h2 className="text-xl font-bold">Upload Your PDF</h2>
        <p className="text-sm text-gray-400">
          Easily upload your PDFs to PDFind and enhance your note-taking
          experience with our seamless integration!
        </p>
      </div>
      <div className="w-[81%]">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-400">PDF File</p>
          <Input
            type="file"
            accept="application/pdf"
            required
            onChange={onFileSelected}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadPdfFile;
