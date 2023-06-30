import { cn } from "@/lib/utils";

export default function LoadingSpinner({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-block h-5 w-5 animate-spin rounded-full border-[0.18rem] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
        className
      )}
      role="status"
      {...props}
    />
  );
}
