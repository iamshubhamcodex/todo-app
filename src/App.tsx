import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import RightAside from "./components/RightAside";
import MainContent from "./components/MainContent";
import { useUserSettingsStore } from "./zustand/userSettingsStore";
import "./App.css";

function App() {
  const {theme} = useUserSettingsStore()
  return (
    <main className={"main " + theme}>
      <Sidebar />
      <div className="content">
        <Navbar />
        <MainContent />
      </div>
      <RightAside />
    </main>
  );
}

export default App;
