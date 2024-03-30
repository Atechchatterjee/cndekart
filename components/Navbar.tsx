"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/tailwind-merge";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

function NavLink({
  href,
  className,
  active = false,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(active && "font-bold text-primary", className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export default function Navbar({
  className,
  padding = true,
  route,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  padding?: boolean;
  route?: "home" | "browse" | "about" | "contact" | "login" | "";
}) {
  const { data: session } = useSession();

  return (
    <div
      className={cn(
        "flex w-full pt-7 pb-7 items-center",
        padding,
        className
      )}
      {...props}
    >
      <Link href="/">
        <Image
          src="https://ik.imagekit.io/hbqsxmwrz/logo.jpg?updatedAt=1711623710644"
          className="cursor-pointer"
          width={120}
          height={24}
          alt="logo"
        />
      </Link>
      <div className="flex gap-8 justify-end items-center w-full text-sm font-medium">
        <NavLink href="/" active={route === "home"}>
          Home
        </NavLink>
        <NavLink href="/browse" active={route === "browse"}>
          Browse
        </NavLink>
        <NavLink href="/about" active={route === "about"}>
          About
        </NavLink>
        <NavLink href="/contact" active={route === "contact"}>
          Contact
        </NavLink>
        {!session ?
          <Button variant={route === "login" ? "primary" : "outline"} className="align-middle" onClick={() => window.location.assign("/login")}>
            Login / Register
          </Button>
          :
          <Button variant={route === "login" ? "primary" : "outline"} className="align-middle"
            onClick={() => {
              signOut({
                redirect: true,
                callbackUrl:
                  (session.user as any)?.role === "ADMIN"
                    ? "/admin/login"
                    : "/login",
              });
            }}
          >
            Logout
          </Button>
        }
      </div>
    </div>
  );
}
