import { useState } from "react";
import {
  useTaskStore,
  type TaskCategoryType,
  type TaskType,
} from "../zustand/taskStore";
import "../css/addTask.css"

type TaskFormDataType = Omit<TaskType, "id" | "category"> & {
  category: number;
};

export default function AddTask() {
  const { activeCategory, categories, setAddingTask, addTask } = useTaskStore();
  const initialTaskData: TaskFormDataType = {
    name: "",
    description: "",
    reminder: new Date(),
    category: activeCategory.id ?? "",
    status: "pending",
    starred: false,
  };
  const todayCategoryId = categories.find(
    (cat) => cat.name === "Today's Tasks"
  )?.id;

  const [taskData, setTaskData] = useState<TaskFormDataType>(initialTaskData);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, id } = e.target;
    setTaskData({ ...taskData, [id]: value });
  };
  const handleCancelClick = () => {
    setAddingTask(false);
  };
  const handleSubmitClick = () => {
    if (taskData.name.trim() === "" || !taskData.reminder) {
      setErrorMessage("Title and Reminder can not be empty");
    }

    addTask({
      name: taskData.name,
      description:
        taskData.description?.trim() === "" ? undefined : taskData.description,
      reminder: new Date(taskData.reminder),
      category: categories.find(
        (category) => category.id === +taskData.category
      )?.id as TaskCategoryType["id"],
      status: taskData.status,
      starred: taskData.starred,
    });
  };

  return (
    <div className="addTask">
      <div className="inputs">
        <div className="input-group w-100">
          <label htmlFor="name">Task Title</label>
          <input
            type="text"
            id="name"
            value={taskData.name}
            onChange={handleDataChange}
						placeholder="Enter Task Title"
          />
        </div>
        <div className="input-group w-100">
          <label htmlFor="description">Task Description</label>
          <input
            type="text"
            id="description"
            value={taskData.description}
            onChange={handleDataChange}
            placeholder="Enter Task Description"
          />
        </div>
        <div
          className={
            "input-group" +
            (+taskData.category !== todayCategoryId ? " w-50" : " w-100")
          }
        >
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={taskData.category}
            onChange={handleDataChange}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {+taskData.category !== todayCategoryId && (
          <div className="input-group w-50">
            <label htmlFor="reminder">Reminder</label>
            <input
              type="date"
              id="reminder"
              value={new Date(taskData.reminder).toISOString().split("T")[0]}
              onChange={handleDataChange}
            />
          </div>
        )}
        {errorMessage.trim() !== "" && (
          <p className="errorMessage">{errorMessage}</p>
        )}
      </div>
      <div className="btns">
        <button onClick={handleCancelClick}>Cancel</button>
        <button onClick={handleSubmitClick}>Create</button>
      </div>
    </div>
  );
}
