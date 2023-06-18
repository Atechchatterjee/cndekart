"use client";
import Navbar from "@/components/Navbar";
import { sora } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BsArrowRight, BsCheck } from "react-icons/bs";
import { cn } from "@/utils/tailwind-merge";

function Cards({
  className,
  title,
  points,
  ...props
}: {
  title: string;
  points: string[];
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 p-6 pl-8 pr-8 rounded-lg bg-white shadow-2xl shadow-primary w-[30rem] h-[30rem]",
        "hover:shadow-3xl hover:shadow-blue-900 transition-shadow duration-300",
        className
      )}
      {...props}
    >
      <h1 className="text-lg font-bold">{title}</h1>
      {points.map((point, key) => (
        <div className="flex gap-3" key={key}>
          <BsCheck
            className="flex-0.1 justify-self-start text-primary"
            size="2em"
          />
          <span className="self-center flex-1">{point}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="rounded-full bg-primary opacity-[10%] blur-[3em] w-[40rem] h-[40rem] absolute left-0 right-0 ml-auto mr-auto z-[-1] mt-[6rem]" />
      <div className="flex flex-col w-[80em] gap-10 self-center">
        <Navbar padding={false} className="w-[100%]" />
        <div className="flex flex-col gap-20">
          <div className="flex flex-col w-full gap-2">
            <h1
              className={`${sora.className} text-[4rem] w-[70rem] self-center text-center font-bold mt-[5rem]`}
            >
              Your <span className="text-primary"> Customized E-commerce</span>{" "}
              Destination for Steel and Fabrication Solutions
            </h1>
            <p className="text-slate-700 self-center text-center text-lg font-medium">
              Experience Seamless Shopping for Steel and Fabrication Solutions
              at CND E-kart.
            </p>
          </div>
          <div className="flex w-full justify-center">
            <div className="w-[25em] flex gap-3">
              <Button
                variant="primary"
                size="xl"
                className="gap-3 w-[10em] flex-1"
              >
                <Image
                  width={15}
                  height={15}
                  alt="explore-icon"
                  src="explore-icon.svg"
                />
                Explore
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="gap-3 w-[10em] flex-1 font-medium"
              >
                Get to know us
                <BsArrowRight size="1rem" strokeWidth="0.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Image
        width={1500}
        height={1000}
        src="intersect.svg"
        alt="intersect"
        className="absolute z-[-1] ml-auto mr-auto left-0 right-0 mt-[47em]"
      />
      <div className="flex w-[100%] bg-primary h-[32.7rem] mt-[14rem]">
        <div className="flex flex-wrap gap-5 mt-[-4rem] left-0 right-0 ml-auto mr-auto">
          <Cards
            title="Quality Product"
            points={[
              "CND E-kart collaborates with reputable suppliers and partners who share the same commitment to quality.",
              "CND E-kart adheres to industry standards and regulations to guarantee the quality of its products.",
              "Before products are made available to customers, CND E-kart conducts thorough testing and inspection procedures.",
              "CND E-kart stands behind the quality of its products by offering warranty and guarantee provisions.",
            ]}
          />
          <Cards
            title="Reliable Service"
            points={[
              "The company understands the importance of meeting project deadlines and ensures that the ordered products and fabrication services are delivered within the agreed-upon time frames.",
              "CND E-kart boasts a team of skilled professionals who are well-versed in the steel and fabrication industry.",
              "The company maintains clear and open lines of communication with its customers throughout the service process.",
              "Satisfaction: CND E-kart is committed to ensuring customer satisfaction with its services.",
            ]}
          />
          <Cards
            title="Customised Solution"
            points={[
              "CND E-kart understands that each customer has unique requirements and preferences.",
              "CND E-kart takes a collaborative approach when working with customers to provide customised solutions.",
              "CND E-kart pays meticulous attention to detail when providing customised solutions.",
              "CND E-kart follows an iterative process when working on customised solutions. The",
              "CND E-kart adopts a problem-solving orientation when providing customised solutions.",
            ]}
          />
        </div>
      </div>
    </div>
  );
}
