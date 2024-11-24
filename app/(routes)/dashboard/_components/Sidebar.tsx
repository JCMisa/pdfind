import { Progress } from "@/components/ui/progress";
import { LayoutDashboard, Shield } from "lucide-react";
import Image from "next/image";
import React from "react";
// import Link from "next/link";
import UploadPdf from "./UploadPdf";

const Sidebar = () => {
  return (
    <div className="shadow-md h-screen p-7 bg-dark-100">
      <div className="flex items-center gap-1">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={1000}
          height={1000}
          className="w-10 h-10"
        />
        <p className="text-xl font-bold">
          <span className="text-primary">PDF</span>ind
        </p>
      </div>

      <div className="mt-10">
        {/* <Link
          href={`/dashboard/uploadPdf`}
          className="flex items-center justify-center text-dark-100 font-bold bg-primary hover:bg-primary-100 transition-all p-3 rounded-lg"
        >
          + Upload PDF
        </Link> */}
        <UploadPdf />

        <div className="flex gap-2 items-center p-3 mt-5 hover:bg-dark transition-all rounded-lg cursor-pointer">
          <LayoutDashboard className="w-4 h-4" />
          <h2>Workspace</h2>
        </div>
        <div className="flex gap-2 items-center p-3 mt-1 hover:bg-dark transition-all rounded-lg cursor-pointer">
          <Shield className="w-4 h-4" />
          <h2>Upgrade</h2>
        </div>
      </div>
      <div className="absolute bottom-24 w-[80%]">
        <Progress value={33} />
        <p className="text-sm mt-1">2 out of 5 PDF Uploaded</p>
        <p className="text-xs text-gray-400 mt-2">Upgrade to upload more PDF</p>
      </div>
    </div>
  );
};

export default Sidebar;
