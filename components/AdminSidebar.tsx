"use client";
import WithAuth from "@/utils/WithAuth";
import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowRight, MdLogout } from "react-icons/md";
import { BsFillInboxesFill, BsFillRocketTakeoffFill } from "react-icons/bs";
import { RiLayoutMasonryFill } from "react-icons/ri";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons/lib";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { FaListUl } from "react-icons/fa";

function DashboardItem({
  variant,
  text,
  href,
  icon: Icon,
}: {
  variant: "active" | "inactive";
  href: string;
  text: string;
  icon: IconType;
}) {
  return (
    <Link href={href}>
      <div
        className={cn(
          "ml-5 mr-5",
          variant === "active" && " bg-primary",
          "flex gap-4 p-3 rounded-lg items-center",
          variant === "active" && "text-white",
          "cursor-pointer",
          variant === "active" ? "hover:brightness-110" : "hover:bg-slate-100"
        )}
      >
        <Icon />
        <p className="self-center font-medium text-sm">{text}</p>
        <MdKeyboardArrowRight className="ml-auto" />
      </div>
    </Link>
  );
}

export default function AdminSidebar({
  active,
}: {
  active?: "dashboard" | "product" | "project" | "queries" | "orders";
}) {
  return (
    <div className="fixed flex flex-col top-3 left-3 bottom-3 w-80 bg-white border-r rounded-lg overflow-y-auto overflow-x-hidden">
      <div className="flex items-center h-14 pl-7 pt-5">
        <Link href="/">
          <Image
            src="/logo.svg"
            className="cursor-pointer"
            width={120}
            height={24}
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-3 w-80 mt-10 h-full">
        <DashboardItem
          variant={active === "dashboard" ? "active" : "inactive"}
          href="/admin/dashboard"
          icon={RiLayoutMasonryFill}
          text="Dashboard"
        />
        <DashboardItem
          variant={active === "product" ? "active" : "inactive"}
          href="/admin/product"
          icon={BsFillRocketTakeoffFill}
          text="Product"
        />
        <DashboardItem
          variant={active === "project" ? "active" : "inactive"}
          href="/admin/project"
          icon={FaListUl}
          text="Project"
        />
        <DashboardItem
          variant={active === "queries" ? "active" : "inactive"}
          href="/admin/queries"
          icon={BsFillInboxesFill}
          text="Queries"
        />
        <DashboardItem
          variant={active === "orders" ? "active" : "inactive"}
          href="/admin/orders"
          icon={RiShoppingCart2Fill}
          text="Orders"
        />
        <Button
          variant="secondary"
          className="ml-5 mr-5 lex gap-4 p-3 rounded-lg items-center justify-center mt-auto mb-5 text-slate-900"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          <MdLogout />
          <p className="font-medium text-sm">Logout</p>
        </Button>
      </div>
    </div>
  );
}
