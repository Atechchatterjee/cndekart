"use client";
import WithAuth from "@/utils/WithAuth";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default () => <WithAuth WrappedComponent={Dashboard} role="ADMIN" />;
