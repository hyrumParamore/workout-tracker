import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Today from "./pages/Today";
import Schedule from "./pages/Schedule";
import Nutrition from "./pages/Nutrition";
import Progress from "./pages/Progress";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"          element={<Today />} />
        <Route path="/schedule"  element={<Schedule />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/progress"  element={<Progress />} />
      </Route>
    </Routes>
  );
}
