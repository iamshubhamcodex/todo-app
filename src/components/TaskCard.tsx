import { FiEdit3 } from "react-icons/fi";
import { getFormattedDate } from "../utility/utils";
import {
  useTaskStore,
  type TaskCategoryType,
  type TaskType,
} from "../zustand/taskStore";
import type { ViewType } from "../zustand/userSettingsStore";
import { MdDeleteOutline } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import type { ChangeEvent } from "react";
import "../css/taskCard.css";

type TasckCardPropType = { task: TaskType; viewType: ViewType };
export default function TaskCard({ task, viewType }: TasckCardPropType) {
  const { id, category, reminder, name, status, description, starred } = task;

  const {
    categories,
    deleteTask,
    toggleStarred,
    setEditingTask,
    updateTaskStatus,
  } = useTaskStore();
  const currentCategories = categories.find(
    (cat) => cat.id === category
  ) as TaskCategoryType;

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateTaskStatus(id, e.target.value as TaskType["status"]);
  };

  if (viewType === "grid")
    return (
      <div className={"taskCard " + status}>
        <div className="taskDetails">
          <div className="head">
            <h3>{name}</h3>
            <select
              className="statusUpdate"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="pending">Pending</option>
              <option value="progress">In Progress</option>
              <option value="done">Completed</option>
            </select>
          </div>
          <p className="desc">
            {description
              ? description.substring(0, 80) +
                (description.length > 80 ? "..." : "")
              : ""}
          </p>

          <p className="date">{getFormattedDate(new Date(reminder))}</p>
        </div>
        <div className="taskActions">
          <p>
            <span className="category" title={currentCategories.name}>
              {currentCategories.name}
            </span>
          </p>
          <div className="actions">
            <div className="star" onClick={() => toggleStarred(id)}>
              {starred ? (
                <FaStar size={22} fill="#ee5480" />
              ) : (
                <CiStar size={22} />
              )}
            </div>
            <span className="edit" onClick={() => setEditingTask(task)}>
              <FiEdit3 size={22} />
            </span>
            <div className="delete" onClick={() => deleteTask(id)}>
              <MdDeleteOutline size={22} />
            </div>
          </div>
        </div>
      </div>
    );
}
