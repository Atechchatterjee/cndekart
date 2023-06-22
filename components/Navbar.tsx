"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/tailwind-merge";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

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
  route?: "browse" | "login" | "about" | "contact";
}) {
  const { data: session } = useSession();

  return (
    <div
      className={cn(
        "flex w-full pt-7 pb-7",
        padding && "pl-[15rem] pr-[15rem]",
        className
      )}
      {...props}
    >
      <Link href="/">
        <Image
          src="/logo.svg"
          className="cursor-pointer"
          width={120}
          height={24}
          alt="logo"
        />
      </Link>
      <div className="flex gap-8 justify-end w-full text-sm font-medium align-center">
        <NavLink href="/browse" active={route === "browse"}>
          Browse
        </NavLink>
        <NavLink href="/login" active={route === "login"}>
          Login
        </NavLink>
        <NavLink href="/about" active={route === "about"}>
          About
        </NavLink>
        <NavLink href="/contact" active={route === "contact"}>
          Contact
        </NavLink>
        {session && (
          <NavLink
            href="/login"
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
          </NavLink>
        )}
      </div>
    </div>
  );
}
