import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { registerUser } from "./routers/user-route";
import {
  createProduct,
  createProductPrices,
  createSubCategories,
  createUnit,
  deleteProduct,
  deleteSubCategories,
  deleteUnit,
  fetchCategories,
  fetchProducts,
  fetchSubCategories,
  fetchUnits,
  updateProductWithImageUrl,
} from "./routers/product-route";

export const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  registerUser: registerUser(),
  createProduct: createProduct(),
  fetchUnits: fetchUnits(),
  fetchCategories: fetchCategories(),
  createProductPrices: createProductPrices(),
  updateProductWithImageUrl: updateProductWithImageUrl(),
  deleteProduct: deleteProduct(),
  createUnit: createUnit(),
  deleteUnit: deleteUnit(),
  fetchProducts: fetchProducts(),
  fetchSubCategories: fetchSubCategories(),
  createSubCategories: createSubCategories(),
  deleteSubCategories: deleteSubCategories(),
});

export type AppRouter = typeof appRouter;
