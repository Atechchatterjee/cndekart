import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function UnauthorisedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full h-[100svh] justify-center gap-10">
      <div className="flex flex-col gap-2 self-center">
        <h1 className="font-bold self-center" style={{ fontSize: "2rem" }}>
          Error 403: Unauthorized
        </h1>
        <p className="text-gray-700 self-center">
          You are not authorized to access this route. Go through the login
          process to access the route.
        </p>
      </div>
      <Button
        variant="secondary"
        size="lg"
        className="self-center"
        style={{ width: "10rem" }}
        onClick={() => {
          router.push("/admin/login");
        }}
      >
        Login
      </Button>
    </div>
  );
}
