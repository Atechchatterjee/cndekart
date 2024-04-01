"use client";
import Navbar from "@/components/Navbar";
import { staatlitches } from "./fonts";
import React from "react";
import { cn } from "@/utils/tailwind-merge";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { IoMdCart } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";
import Footer from "@/components/Footer";

function HomePage() {
  return (
    <>
      <div className="w-[100rem] m-auto">
        <Navbar route="home" />
        <div className="pt-[4rem]">
          <h1
            className={cn(
              staatlitches.className,
              "text-[5.3rem] w-[80%] leading-tight"
            )}
          >
            GET <span className="text-primary">STEEL GOODS </span>&{" "}
            <span className="text-primary">SERVICES</span> AT THE BEST PRICE
            POSSIBLE
          </h1>
          <div className="mt-[1rem] flex items-center">
            <h3 className="font-[#6B6B6B] font-medium w-[7rem]">
              our offerings
            </h3>
            <div className="h-[0.13rem] w-[63%] bg-[#6B6B6B]"></div>
          </div>
          <div className="mt-[4rem] flex flex-row w-[100%] gap-10">
            <div className="flex flex-col w-[100%] gap-10 pt-[1rem]">
              <div className="flex h-[5rem] border-[0.2rem] border-white border-b-[#6B6B6B] pb-[5.4rem]  hover:cursor-pointer">
                <div className="flex flex-col gap-5">
                  <h4 className="text-xl font-semibold">Ready Made Product</h4>
                  <p>We offer different varieties of pre-made products</p>
                </div>
                <MdOutlineKeyboardArrowRight
                  size={40}
                  className="ml-auto mt-[1.5rem]"
                  color="#6B6B6B"
                />
              </div>
              <div className="flex h-[5rem] border-[0.2rem] border-white border-b-[#6B6B6B] pb-[5.4rem]  hover:cursor-pointer">
                <div className="flex flex-col gap-5">
                  <h4 className="text-xl font-semibold">
                    Made to Order Product
                  </h4>
                  <p>We offer different varieties of made to products</p>
                </div>
                <MdOutlineKeyboardArrowRight
                  size={40}
                  className="ml-auto mt-[1.5rem]"
                  color="#6B6B6B"
                />
              </div>
              <div className="flex h-[5rem] border-[0.2rem] border-white border-b-[#6B6B6B] pb-[5.4rem]  hover:cursor-pointer">
                <div className="flex flex-col gap-5">
                  <h4 className="text-xl font-semibold">Services</h4>
                  <p>
                    We offer different varieties of services related to these
                    products
                  </p>
                </div>
                <MdOutlineKeyboardArrowRight
                  size={40}
                  className="ml-auto mt-[1.5rem]"
                  color="#6B6B6B"
                />
              </div>
              <div className="flex gap-3 mt-auto pb-[7rem]">
                <Button
                  variant="primary"
                  className="flex gap-3"
                  size="xl"
                  onClick={() => window.location.assign("/browse")}
                >
                  <IoMdCart size={20} />
                  Browse Product
                </Button>
                <Button variant="outline" className="flex gap-5" size="xl">
                  More Offerings
                  <IoMdArrowForward />
                </Button>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-[url('https://ik.imagekit.io/hbqsxmwrz/home_img2.png?updatedAt=1711623713320')] w-[457px] h-[668px] bg-no-repeat bg-cover shadow-[rgba(0,_0,_0,_0.4)_0px_10px_50px] hover:scale-105 transition-all duration-500 hover:opacity-90"></div>
              <div className="mt-[-10rem] bg-[url('https://ik.imagekit.io/hbqsxmwrz/home_img1.png?updatedAt=1711623714587')] w-[457px] h-[668px] bg-cover shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] hover:scale-105 transition-all duration-500 hover:opacity-90"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white w-full h-[6rem] outline outline-1 outline-[#6B6B6B] mt-[5rem]">
        <div className="w-[100rem] m-auto h-full">
          <div className="bg-white p-5 absolute mt-[-2rem]">
            Clients we worked with
          </div>
          <div className="flex gap-5 text-[#6B6B6B] items-center h-full">
            {[
              "Burger Paints",
              "⬤",
              "HAL",
              "⬤",
              "Tandoor Park",
              "⬤",
              "Texmaco Rail & Engineering",
              "⬤",
              "SM Export",
              "⬤",
              "IIT Kharagpur",
              "⬤",
              "Rashmi Group",
            ].map((clients, i) =>
              clients === "⬤" ? (
                <div className="text-[0.4rem]" key={i}>
                  {clients}
                </div>
              ) : (
                <div className="text-[1.2rem]" key={i}>
                  {clients}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-[5rem] mt-[-2rem] bg-[#D8DEE3] absolute z-[-1]"></div>
      <div className="flex gap-5 w-[100rem] m-auto mt-[8rem]">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 p-[2rem] bg-white border-[0.1rem] border-[#6B6B6B] rounded-3xl hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:border-white">
            <h4
              className={cn(
                staatlitches.className,
                "text-[3rem] w-[80%] leading-tight"
              )}
            >
              Why Consider Us?
            </h4>
            <p className="text-lg">
              We believe in offering dedicated service to you guys for our
              business growth in near future. The members of our community are
              all talented and have years of experience in constructional
              business. So heading for the best service is an easy piece of cake
              for them.
            </p>
            <p className="text-lg">
              Embracing an unwavering commitment to providing unparalleled
              service, we pledge to elevate your experience to extraordinary
              heights. Our esteemed community members, brimming with boundless
              talent and decades of honed expertise in the realm of
              construction, effortlessly navigate the path towards excellence in
              service provision. Rest assured, delivering nothing short of
              perfection is not just our goal, but our inherent nature.
            </p>
            <div className="mt-10 flex gap-3 font-medium items-center text-primary hover:cursor-pointer hover:opacity-70 transition-opacity">
              Learn More
              <IoMdArrowForward />
            </div>
          </div>
          <div className="flex gap-5">
            <div
              className={cn(
                staatlitches.className,
                "transition-all hover:cursor-pointer hover:bg-primary hover:text-white p-[1.5rem] text-primary border border-primary rounded-3xl h-fit w-full hover:scale-105 duration-500 hover:shadow-2xl"
              )}
            >
              <p className="text-[4.5rem]">50+</p>
              <p className="text-[2rem] opacity-70">Clients</p>
            </div>
            <div
              className={cn(
                staatlitches.className,
                "transition-all hover:cursor-pointer hover:bg-primary hover:text-white p-[1.5rem] text-primary border border-primary rounded-3xl h-fit w-full hover:scale-105 duration-500  hover:shadow-2xl"
              )}
            >
              <p className="text-[4.5rem]">70+</p>
              <p className="text-[2rem] opacity-70">Products</p>
            </div>
            <div
              className={cn(
                staatlitches.className,
                "transition-all hover:cursor-pointer hover:bg-primary hover:text-white p-[1.5rem] text-primary border border-primary rounded-3xl h-fit w-full hover:scale-105 duration-500 hover:shadow-2xl"
              )}
            >
              <p className="text-[4.5rem]">20+</p>
              <p className="text-[2rem] opacity-70">Services</p>
            </div>
          </div>
        </div>
        <div className="flex gap-5 w-[99%] flex-col p-[2rem]  bg-primary text-white rounded-3xl hover:scale-105 transition-all hover:shadow-2xl duration-500">
          <h4
            className={cn(
              staatlitches.className,
              "text-[3rem] w-[80%] leading-tight"
            )}
          >
            Providing Solutions for decades
          </h4>
          <p className="text-lg">
            At CND Engineering we prefer to use all environment friendly
            materials and try to maintain green building solution code. We
            always try to reduce the electrical consumption of the owner and in
            turn it helps them to reduce the recurring energy expenses. One time
            capital investment gives them the aesthetic look as well as the
            monetary savings in the long term basis.
          </p>
          <p className="text-lg">
            We have so many products for you, right from steel sheds to
            structures, awnings and canopies and much more. Our industrial shed
            structures and other steel constructions are gaining quite some
            popularity all over Kolkata. Even though we started with our
            headquarters in the City of Joy, but our main objective is to spread
            and expand our business as much as possible. We would like to be
            your trusted Fabricator in Kolkata.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
