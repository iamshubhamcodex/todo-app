import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getUniqueId } from "../utility/utils";

export type TaskCategoryType = {
  id: number;
  name: string;
  default?: boolean;
  active?: boolean;
};
export type TaskStatus = "pending" | "progress" | "done";
export type TaskType = {
  id: number;
  name: string;
  description?: string;
  reminder: Date;
  status: TaskStatus;
  category: TaskCategoryType["id"];
  starred?: boolean;
};

interface TaskStoreType {
  tasks: TaskType[];
  searchValue: string;
  categories: TaskCategoryType[];
  activeCategory: TaskCategoryType;
  addingTask: boolean;
  editingTask: TaskType | undefined;
  setSearchValue: (value: string) => void;
  createCategory: (category: Omit<TaskCategoryType, "id">) => void;
  setActiveCategory: (category: TaskCategoryType) => void;
  deleteCategory: (category: TaskCategoryType) => void;
  deleteTask: (id: TaskType["id"]) => void;
  editTask: (task: TaskType) => void;
  addTask: (task: Omit<TaskType, "id">) => void;
  toggleStarred: (id: TaskType["id"]) => void;
  updateTaskStatus: (id: TaskType["id"], status: TaskType["status"]) => void;
  setAddingTask: (adding: boolean) => void;
  setEditingTask: (task: TaskType | undefined) => void;
}

const defaultCategoriesList = [
  { id: getUniqueId(), name: "ALL Tasks", default: true, active: true },
  {
    id: getUniqueId() + 60,
    name: "Today's Tasks",
    default: true,
  },
];
export const useTaskStore = create<TaskStoreType>()(
  persist(
    (set) => ({
      searchValue: "",
      tasks: [],
      categories: defaultCategoriesList,
      activeCategory: defaultCategoriesList[0],
      addingTask: false,
      editingTask: undefined,
      setActiveCategory: (category: TaskCategoryType) => {
        return set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === category.id
              ? { ...cat, active: true }
              : { ...cat, active: false }
          ),
          addingTask: false,
          editingTask: undefined,
          activeCategory: category,
        }));
      },
      setSearchValue: (value: string) => set({ searchValue: value }),
      createCategory: (category: Omit<TaskCategoryType, "id">) =>
        set((state) => ({
          categories: [...state.categories, { id: getUniqueId(), ...category }],
        })),
      deleteCategory: (category: TaskCategoryType) =>
        set((state) => ({
          categories: state.categories.filter((cat) => cat.id !== category.id),
          tasks: state.tasks.filter((task) => task.category !== category.id),
        })),
      deleteTask: (id: TaskType["id"]) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      editTask: (task: TaskType) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
          editingTask: undefined,
        })),
      addTask: (task: Omit<TaskType, "id">) =>
        set((state) => ({
          tasks: [...state.tasks, { id: getUniqueId(), ...task }],
          addingTask: false,
        })),
      toggleStarred: (id: TaskType["id"]) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, starred: !task.starred } : task
          ),
        })),
      updateTaskStatus: (id: TaskType["id"], status: TaskStatus) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status: status } : task
          ),
        })),
      setAddingTask: (adding?: boolean) => set({ addingTask: adding }),
      setEditingTask: (task: TaskType | undefined) =>
        set({ editingTask: task }),
    }),
    { name: "taskStore" }
  )
);
