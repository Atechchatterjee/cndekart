"use client";
import AdminSidebar from "@/components/AdminSidebar";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import ProductList from "./ProductList";
import CreateProduct from "./CreateProduct";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import UnauthorisedPage from "@/components/UnauthorisedPage";
import { ClockLoader } from "react-spinners";

export default function Product() {
  const {
    data: productLists,
    isLoading,
    refetch,
  } = trpc.fetchProducts.useQuery({});
  const { status } = useSession();

  if (status === "authenticated")
    return (
      <div className="min-h-screen flex flex-shrink-0 antialiased bg-slate-200 text-gray-800">
        <AdminSidebar active="product" />
        <div className="bg-white rounded-lg fixed top-3 left-[21.5rem] bottom-3 right-3 p-7 pl-10 overflow-x-auto">
          <div className="flex flex-col gap-2 border-b pb-5 border-gray-200">
            <div className="flex gap-4 items-center">
              <BsFillRocketTakeoffFill
                className="text-slate-600"
                size="1.2rem"
              />
              <h1 className="text-2xl text-slate-800 font-bold">
                Manage Your Products
              </h1>
            </div>
            <p className="text-sm text-slate-600">
              Create, View and Manage all your products here.
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl text-slate-700 font-bold">
                Create Your Product
              </h1>
              <p className="text-sm text-slate-600">
                Use the given form to insert information for each product.
              </p>
            </div>
            <CreateProduct refetchProductLists={refetch} />
          </div>
          <ProductList productLists={productLists} isLoading={isLoading} />
        </div>
      </div>
    );
  else if (status === "unauthenticated") return <UnauthorisedPage />;
  else
    return (
      <div className="flex w-[100vw] h-[100svh] justify-center">
        <ClockLoader className="text-primary m-auto self-center justify-center" />
      </div>
    );
}
