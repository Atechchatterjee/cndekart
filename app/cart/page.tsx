"use client";
import WithAuth from "@/utils/WithAuth";

function Cart() {
  return <h1>Cart Items</h1>;
}

export default () => <WithAuth WrappedComponent={Cart} />;
