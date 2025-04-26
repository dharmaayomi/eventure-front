import { useState } from "react";
import NavbarDash from "../_components/NavbarDash";
import SidebarDash from "../_components/SidebarDash";

export default function DashboardPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavbarDash toggleSidebar={toggleSidebar} />
      <SidebarDash isOpen={isSidebarOpen} />
      <main className="p-4 pt-20 pl-0 sm:pl-64">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Welcome to Dashboard
        </h1>
      </main>
    </div>
  );
}
