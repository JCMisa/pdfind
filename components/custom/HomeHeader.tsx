import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { getUser } from "@/utils/auth";
import { UserButton } from "@clerk/nextjs";

const HomeHeader = async () => {
  const user = await getUser();

  return (
    <header className="bg-dark-100 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={1000}
            height={1000}
            className="w-10 h-10"
          />
          <span className="ml-3 text-xl">
            <span className="text-primary">PDF</span>ind
          </span>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-white">First Link</a>
          <a className="mr-5 hover:text-white">Second Link</a>
          <a className="mr-5 hover:text-white">Third Link</a>
          <a className="mr-5 hover:text-white">Fourth Link</a>
        </nav>
        {user ? (
          <div className="flex items-center gap-2">
            <Button className="text-dark-100 w-32">
              <Link href={"/dashboard"} className="font-bold">
                Dashboard
              </Link>
            </Button>
            <div className="flex items-center gap-1">
              <UserButton />
              <div className="flex flex-col items-start">
                <p className="text-sm">{user?.fullName}</p>
                <span className="text-xs text-gray-400">
                  {user?.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <Button className="text-dark-100 w-32">
            <Link href={"/sign-in"} className="font-bold">
              Sign in
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default HomeHeader;
