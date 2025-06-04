import { isTodaysTask } from "../utility/utils";
import { useTaskStore } from "../zustand/taskStore";
import {
  useUserSettingsStore,
  type FilterByType,
} from "../zustand/userSettingsStore";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import TaskCard from "./TaskCard";
import "../css/mainContent.css";

export default function MainContent() {
  const {
    tasks,
    searchValue,
    addingTask,
    editingTask,
    activeCategory,
  } = useTaskStore();
  const {
    filterBy,
    setFilterBy,
    viewType,
    // setViewType
  } = useUserSettingsStore();

  let filteredTasks = tasks;

  if (activeCategory?.name !== "ALL Tasks")
    filteredTasks = tasks.filter(
      (task) => task.category === activeCategory?.id
    );
  if (activeCategory?.name === "Today's Tasks")
    filteredTasks = tasks.filter((task) =>
      isTodaysTask(new Date(task.reminder))
    );

  if (searchValue && searchValue.trim() !== "")
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchValue.toLowerCase())
    );
  if (filterBy !== "all")
    filteredTasks = filteredTasks.filter((task) => task.status === filterBy);

  filteredTasks = filteredTasks.sort(
    (task1, task2) =>
      (task2.starred ? task2.id : 0) - (task1.starred ? task1.id : 0)
  );

  if (!addingTask && !editingTask && activeCategory)
    return (
      <div className="mainContentContainer">
        <h3>
          {activeCategory.name} ({filteredTasks.length} task
          {filteredTasks.length > 1 ? "s" : ""})
        </h3>
        <div className="taskActions">
          <div className="view">
            {/* <div
              className={"listView" + (viewType === "list" ? " active" : "")}
              onClick={() => setViewType("list")}
            >
              <CiBoxList size={25} strokeWidth={0.4} />
            </div>
            <div
              className={"gridView" + (viewType === "grid" ? " active" : "")}
              onClick={() => setViewType("grid")}
            >
              <CiGrid41 size={25} strokeWidth={0.4} />
            </div> */}
          </div>
          <div className="sortBy">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as FilterByType)}
            >
              <option value="all">All</option>
              <option value="done">Completed</option>
              <option value="progress">Progress</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
        <div className={"taskContainer " + viewType}>
          {filteredTasks.length > 0 ? (
            <>
              {filteredTasks.map((task) => (
                <TaskCard {...{ task, viewType }} key={task.id} />
              ))}
            </>
          ) : (
            <p>
              No Task in <b>{activeCategory.name}</b>
            </p>
          )}
        </div>
      </div>
    );

  if (addingTask)
    return (
      <div className="mainContentContainer">
        <h3>Add Task</h3>
        <AddTask />
      </div>
    );
  if (editingTask)
    return (
      <div className="mainContentContainer">
        <h3>Update Task</h3>
        <EditTask />
      </div>
    );
}
