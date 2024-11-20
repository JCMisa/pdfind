import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      Lets Go!!! <Button>Get Started</Button>
      <Button className="bg-primary-100">Get Started 2</Button>
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={1000}
        height={1000}
        className="w-20 h-20"
      />
    </div>
  );
}
