"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ClockLoader } from "react-spinners";

// Wrapper Component to implement protected routes
export default function WithAuth({
  WrappedComponent,
  redirectURI,
  role,
  ...props
}: {
  WrappedComponent: (_: any) => any;
  redirectURI?: string;
  role?: "ADMIN" | "USER"; // the role user is expected to have
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  function Auth() {
    switch (status) {
      case "authenticated":
        return <WrappedComponent {...props} />;
      case "unauthenticated":
        return (
          <div className="flex flex-col w-full h-[100svh] justify-center gap-10">
            <div className="flex flex-col gap-2 self-center">
              <h1
                className="font-bold self-center"
                style={{ fontSize: "2rem" }}
              >
                Error 403: Unauthorized
              </h1>
              <p className="text-gray-700 self-center">
                You are not authorized to access this route. Go through the
                login process to access the route.
              </p>
            </div>
            <Button
              variant="secondary"
              size="lg"
              className="self-center"
              style={{ width: "10rem" }}
              onClick={() => {
                if (role === "ADMIN") router.push("/admin/login");
                else router.push("/login");
              }}
            >
              Login
            </Button>
          </div>
        );
      case "loading":
        return (
          <div className="absolute top-0 left-0 right-0 bottom-0 m-auto">
            <ClockLoader color="primary" />
          </div>
        );
    }
  }

  return <Auth />;
}
