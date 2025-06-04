import { MdDeleteOutline } from "react-icons/md";
import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useTaskStore, type TaskCategoryType } from "../zustand/taskStore";
import { useUserSettingsStore } from "../zustand/userSettingsStore";
import { FaX } from "react-icons/fa6";
import "../css/sidebar.css";

export default function Sidebar() {
  const [category, setCategory] = useState<Omit<TaskCategoryType, "id"> | null>(
    null
  );

  const {
    categories,
    setAddingTask,
    createCategory,
    deleteCategory,
    setActiveCategory,
  } = useTaskStore();
  const { showSidebar, toggleSidebar } = useUserSettingsStore();

  const handleCreateNewClick = () => {
    setCategory({ name: "" });
  };
  const handleCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory({ name: e.target.value });
  };
  const handleCategorySubmit = () => {
    if (category && category.name.trim() !== "") {
      createCategory({ name: category.name, default: false, active: false });
    }
    setCategory(null);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCategorySubmit();
    }
  };
  const handleDeleteClick = (category: TaskCategoryType) => {
    deleteCategory(category);
  };
  const handleActiveCategoryClick = (category: TaskCategoryType) => {
    setActiveCategory(category);
    toggleSidebar();
  };

  return (
    <div className={"sidebarContainer" + (showSidebar ? " show" : "")}>
      <div className="sidebar">
        {showSidebar && (
          <span className="close" onClick={toggleSidebar}>
            <FaX size={18} />
          </span>
        )}
        <h3>TO-DO LIST</h3>
        <button
          className="addTask"
          onClick={() => {
            setAddingTask(true);
            toggleSidebar();
          }}
        >
          Add New Task
        </button>
        <div className="categories">
          {(categories ?? []).map((category) => (
            <div
              key={category.id}
              className={"category-item" + (category.active ? " active" : "")}
              onClick={() => handleActiveCategoryClick(category)}
            >
              <p>{category.name}</p>
              {!category.default && (
                <span onClick={() => handleDeleteClick(category)}>
                  <MdDeleteOutline size={20} />
                </span>
              )}
            </div>
          ))}
        </div>
        {category == null ? (
          <button onClick={handleCreateNewClick} className="addCategories">
            + New
          </button>
        ) : (
          <input
            className="addCategories"
            value={category.name}
            onKeyDown={handleKeyDown}
            onChange={handleCategoryNameChange}
            autoFocus
            onBlur={handleCategorySubmit}
          />
        )}
      </div>
    </div>
  );
}
