import { CiSettings } from "react-icons/ci";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { useTaskStore } from "../zustand/taskStore";
import { useUserSettingsStore } from "../zustand/userSettingsStore";
import "../css/navbar.css";

export default function Navbar() {
  const { searchValue, tasks, setSearchValue, setAddingTask } = useTaskStore();
  const { toggleSidebar, toggleSideSetting } = useUserSettingsStore();

  return (
    <div className="navbarContainer">
      <span className="sidebarToggle" onClick={toggleSidebar}>
        <FaBarsStaggered size={20} />
      </span>
      <div className="input">
        <input
          type="text"
          placeholder={"Search task" + (tasks.length > 1 ? "s" : "")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <IoMdSearch size={20} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <button onClick={() => setAddingTask(true)}>Add Task</button>
        <span className="sideSetting" onClick={toggleSideSetting}>
          <CiSettings size={20} />
        </span>
      </div>
    </div>
  );
}
