import { createContext } from "react";

export interface IFetchOnMountContext {
  fetchCategoriesOnMount?: boolean;
  fetchUnitsOnMount?: boolean;
}

export const FetchOnMountContext = createContext<IFetchOnMountContext>({
  fetchCategoriesOnMount: false,
  fetchUnitsOnMount: false,
});
