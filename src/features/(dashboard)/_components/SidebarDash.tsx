interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 h-screen w-64 pt-20 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } border-r border-gray-200 bg-white sm:translate-x-0 dark:border-gray-700 dark:bg-gray-800`}
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {/* Example Menu */}
          <li>
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="h-5 w-5 text-gray-500 transition duration-75 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a8 8 0 108 8 8.009 8.009 0 00-8-8zM8 12V8h4v4z" />
              </svg>
              <span className="ms-3">Dashboard</span>
            </a>
          </li>
          {/* Tambah menu lainnya sesuai kebutuhan */}
        </ul>
      </div>
    </aside>
  );
}
