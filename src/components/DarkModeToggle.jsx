import { Moon, Sun } from "lucide-react";

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
    return (
        <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="text-sm px-3 py-1 border rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:shadow"
        >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
    );
};

export default DarkModeToggle;
