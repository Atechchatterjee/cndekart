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
  fetchProduct,
  fetchSubCategories,
  fetchUnits,
  updateProductWithImageUrl,
  updateProduct,
  fetchAllManufacturer,
  createManufacturer,
  deleteManufacturer,
} from "./routers/product-route";

export const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  registerUser: registerUser(),
  createProduct: createProduct(),
  updateProduct: updateProduct(),
  fetchUnits: fetchUnits(),
  fetchCategories: fetchCategories(),
  createProductPrices: createProductPrices(),
  updateProductWithImageUrl: updateProductWithImageUrl(),
  deleteProduct: deleteProduct(),
  createUnit: createUnit(),
  deleteUnit: deleteUnit(),
  fetchProducts: fetchProducts(),
  fetchProduct: fetchProduct(),
  fetchSubCategories: fetchSubCategories(),
  createSubCategories: createSubCategories(),
  deleteSubCategories: deleteSubCategories(),
  fetchAllManufacturer: fetchAllManufacturer(),
  createManufacturer: createManufacturer(),
  deleteManufacturer: deleteManufacturer(),
});

export type AppRouter = typeof appRouter;
