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
import {
  createProject,
  updateProjectWithImageUrl,
  fetchProject,
  fetchAllProject,
  deleteProject,
} from "./routers/project-route";

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
  createProject: createProject(),
  updateProjectWithImageUrl: updateProjectWithImageUrl(),
  fetchProject: fetchProject(),
  fetchAllProject: fetchAllProject(),
  deleteProject: deleteProject(),
});

export type AppRouter = typeof appRouter;
