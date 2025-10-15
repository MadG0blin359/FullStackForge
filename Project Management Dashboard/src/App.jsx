import { useState } from "react";
import DashboardRoutes from "./routes/DashboardRoutes";

const App = () => {
  const [activeItem, setActiveItem] = useState("overview");

  return (
    <div className="min-h-dvh bg-gray-50 text-gray-800">
      <DashboardRoutes activeItem={activeItem} setActiveItem={setActiveItem} />
    </div>
  );
};

export default App;
