"use client";
import WithAuth from "@/utils/WithAuth";
import AdminSidebar from "@/components/AdminSidebar";

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-shrink-0 antialiased bg-slate-200 text-gray-800">
      <AdminSidebar active="dashboard" />
      <div className="bg-white rounded-lg fixed top-3 left-[21.5rem] bottom-3 right-3"></div>
    </div>
  );
}

export default function DashboardWithAuth() {
  return <WithAuth WrappedComponent={Dashboard} role="ADMIN" />;
}
