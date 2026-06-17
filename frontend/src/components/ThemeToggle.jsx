import { useEffect, useState } from "react";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <label className="theme-switch">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={() =>
          setDarkMode(!darkMode)
        }
      />

      <span className="theme-slider"></span>
    </label>
  );
}

export default ThemeToggle;