import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./supabase-client";
import { Session } from "@supabase/supabase-js";

// Wrapper Component to implement protected routes
export default function WithAuth({
  WrappedComponent,
  redirectURI,
  ...props
}: {
  WrappedComponent: (_: any) => any;
  redirectURI?: string;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  function Auth() {
    useEffect(() => {
      (async () => {
        const { data } = await supabase.auth.getSession();
        setSession(data?.session);
        if (!data?.session) router.push(redirectURI || "/login");
      })();
    }, [session]);

    return session ? <WrappedComponent {...props} /> : <></>;
  }

  return <Auth />;
}
