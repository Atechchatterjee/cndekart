import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/tailwind-merge";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase-client";

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

const activePath = ["browse", "login", "about", "contact"] as const;

export default function Navbar({
  className,
  padding = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { padding?: boolean }) {
  const path = usePathname();
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState<(typeof activePath)[number]>();
  const [user, setUser] = useState<any>();

  // infers link's active state based on the url
  function inferLinkActiveState() {
    if (
      activePath.includes(path.split("/")[1] as (typeof activePath)[number])
    ) {
      setCurrentPath(path.split("/")[1] as (typeof activePath)[number]);
    }
  }

  useEffect(() => {
    inferLinkActiveState();
    (async function fetchSession() {
      const session = await supabase.auth.getSession();
      if (session && session.data) setUser(session.data.session?.user);
      console.log({ sessionData: session.data });
    })();
  }, [path]);

  return (
    <div
      className={cn(
        "flex w-full pt-7 pb-7",
        padding && "pl-[15rem] pr-[15rem]",
        className
      )}
      {...props}
    >
      <Image
        src="/logo.svg"
        className="cursor-pointer"
        width={120}
        height={24}
        alt="logo"
        onClick={() => router.push("/")}
      />
      <div className="flex gap-8 justify-end w-full text-sm font-medium align-center">
        <NavLink href="/browse" active={currentPath === "browse"}>
          Browse
        </NavLink>
        <NavLink href="/login" active={currentPath === "login"}>
          Login
        </NavLink>
        <NavLink href="/about" active={currentPath === "about"}>
          About
        </NavLink>
        <NavLink href="/contact" active={currentPath === "contact"}>
          Contact
        </NavLink>
        {user && (
          <NavLink
            href="/login"
            onClick={() => {
              supabase.auth.signOut();
              router.refresh();
            }}
          >
            Logout
          </NavLink>
        )}
      </div>
    </div>
  );
}
