import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeType = "light" | "dark";
export type ViewType = "list" | "grid";
export type FilterByType = "all" | "done" | "pending" | "progress";

interface UserSettings {
  theme: ThemeType;
  viewType: ViewType;
  filterBy: FilterByType;
  showSidebar: boolean;
  sideSetting: boolean;
  setTheme: (theme?: ThemeType) => void;
  setViewType: (viewType: ViewType) => void;
  setFilterBy: (filterBy: FilterByType) => void;
  toggleSidebar: () => void;
  toggleSideSetting: () => void;
}

export const useUserSettingsStore = create<UserSettings>()(
  persist(
    (set) => ({
      theme: "light",
      viewType: "grid",
      filterBy: "all",
      showSidebar: false,
      sideSetting: false,
      setTheme: (theme) =>
        set((state) => ({
          theme: theme ?? state.theme === "light" ? "dark" : "light",
        })),
      setViewType: (viewType) => set({ viewType: viewType }),
      setFilterBy: (filterBy) => set({ filterBy: filterBy }),
      toggleSidebar: () =>
        set((state) => ({ showSidebar: !state.showSidebar })),
      toggleSideSetting: () =>
        set((state) => ({ sideSetting: !state.sideSetting })),
    }),
    { name: "userSettingStore" }
  )
);
