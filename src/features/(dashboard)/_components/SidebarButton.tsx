interface SidebarButtonProps {
  toggleSidebar: () => void;
}

export default function SidebarButton({ toggleSidebar }: SidebarButtonProps) {
  return (
    <button
      onClick={toggleSidebar}
      className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none sm:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <span className="material-icons">menu</span>
    </button>
  );
}
