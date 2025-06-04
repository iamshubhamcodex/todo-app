import { FaX } from "react-icons/fa6";
import { isTodaysTask } from "../utility/utils";
import { useTaskStore } from "../zustand/taskStore";
import { useUserSettingsStore } from "../zustand/userSettingsStore";
import "../css/rightAside.css";

export default function RightAside() {
  const { tasks } = useTaskStore();
  const { theme, setTheme, sideSetting, toggleSideSetting } =
    useUserSettingsStore();
  const completedTasks = tasks.filter((task) => task.status === "done");
  const completedPercentage =
    tasks.length === 0
      ? "0%"
      : `${(completedTasks.length / tasks.length) * 100}%`;
  const todaysTasks = tasks.filter((task) =>
    isTodaysTask(new Date(task.reminder))
  );

  const handleDarkModeChange = () => {
    setTheme();
  };

  return (
    <div className={"rightAsideContainer" + (sideSetting ? " show" : "")}>
      <div className="rightAside">
        <span className="close" onClick={toggleSideSetting}>
          <FaX size={20} />
        </span>
        <h3>Hi, There!</h3>
        <div className="darkMode">
          <p>Dark Mode</p>
          {/* Made By ChatGPT */}
          <div className="toggleBtn">
            <label className="switch">
              <input
                type="checkbox"
                onChange={handleDarkModeChange}
                checked={theme === "dark"}
              />
              <span className="slider round"></span>
            </label>
            <style>{`
              .switch {
                position: relative;
                display: inline-block;
                width: 50px;
                height: 24px;
              }
              .switch input {
                opacity: 0;
                width: 0;
                height: 0;
              }
              .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: var(--rightAsideChecBoxBg);
                -webkit-transition: 0.4s;
                transition: 0.4s;
              }
              .slider:before {
                position: absolute;
                content: "";
                height: 16px;
                width: 16px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                -webkit-transition: 0.4s;
                transition: 0.4s;
              }
              input:checked + .slider {
                background-color: var(--primaryColor);
              }
              input:focus + .slider {
                box-shadow: 0 0 1px #00000045;
              }
              input:checked + .slider:before {
                -webkit-transform: translateX(26px);
                -ms-transform: translateX(26px);
                transform: translateX(26px);
              }

              /* Rounded sliders */
              .slider.round {
                border-radius: 34px;
              }
              .slider.round:before {
                border-radius: 50%;
              }
            `}</style>
          </div>
        </div>
        <div className="taskOverview">
          <div className="taskTotal">
            <p>All Task{tasks.length > 1 ? "s" : ""}</p>
            <p>
              {completedTasks.length} / {tasks.length}
            </p>
          </div>
          <div className="progressBar">
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: completedPercentage }}
              ></div>
              <style>{`
                   .taskOverview .progress {
                        width: 100%;
                        height: 8px;
                        background-color: var(--rightAsideChecBoxBg);
                        border-radius: 8px;
                        overflow: hidden;
                    }
                    .taskOverview .progress-bar {
                        height: 100%;
                        background-color: var(--primaryColor);
                        width: 50%;
                    }
                `}</style>
            </div>
          </div>
        </div>
        <hr />
        <div className="todayTaskLists">
          <h2>Today's Task{todaysTasks.length > 1 ? "s" : ""}</h2>
          {todaysTasks.length > 0 ? (
            todaysTasks.map((task) => (
              <div key={task.id}>
                <p>{task.name}</p>
                <p className="desc">{task.description}</p>
              </div>
            ))
          ) : (
            <p>No Task Today</p>
          )}
        </div>
      </div>
    </div>
  );
}
