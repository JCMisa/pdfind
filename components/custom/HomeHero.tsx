import { addUser } from "@/app/actions/user-action";
import { getUser } from "@/utils/auth";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeHero = async () => {
  const user = await getUser();

  if (user) {
    await addUser(
      user?.id as string,
      user?.fullName as string,
      user?.primaryEmailAddress?.emailAddress as string,
      user?.imageUrl as string,
      moment().format("MM-DD-YYYY")
    );
  }

  return (
    <section className="body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
          <Image
            className="object-cover object-center rounded"
            alt="hero"
            width={1000}
            height={1000}
            src="https://dummyimage.com/720x600"
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Before they sold out
            <br className="hidden lg:inline-block" />
            readymade gluten
          </h1>
          <p className="mb-8 leading-relaxed">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage hot chicken authentic tumeric truffaut
            hexagon try-hard chambray.
          </p>
          <div className="flex justify-center items-center gap-5">
            <Link
              href={"/dashboard"}
              className="inline-flex text-dark font-bold bg-primary transition-all border-0 py-2 px-6 focus:outline-none hover:bg-primary-100 rounded text-lg"
            >
              Get Started
            </Link>
            <Link
              href={"/"}
              className="inline-flex text-dark font-bold bg-primary-100 border-0 py-2 px-6 focus:outline-none rounded text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
