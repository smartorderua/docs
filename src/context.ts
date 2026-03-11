import { createContext } from "react";

export type Release = { tag_name: string; created_at: Date };

export type GlobalContext = {
  releaseTag: string;
  setReleaseTag: (value: string) => void;
  releases: Release[];
  layout?: "stacked" | "sidebar";
};

export const defaultGlobalContext: GlobalContext = {
  releaseTag: "",
  setReleaseTag: () => {},
  releases: [],
};

export const GlobalContext = createContext<GlobalContext>(defaultGlobalContext);
