import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDarkMode(!darkMode);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(
      `/search?q=${encodeURIComponent(search)}`
    );
  };

  return (
    <header className="top-header">

      <div className="header-inner">

        <Link
          to="/"
          className="logo"
        >
          KAZNEWS
        </Link>

        <nav className="main-nav">

          <Link to="/">
            Главная
          </Link>

          <Link to="/news">
            Новости
          </Link>

          <Link to="/blogs">
            Блоги
          </Link>

          <Link to="/articles">
            Статьи
          </Link>

          <Link to="/events">
            События
          </Link>

          <Link to="/about">
            О проекте
          </Link>

          <Link to="/contacts">
            Контакты
          </Link>

          <Link to="/feedback">
            Обратная связь
          </Link>

        </nav>

        <form
          className="header-search"
          onSubmit={handleSearch}
        >

          <input
            type="text"
            placeholder="Поиск..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button type="submit">
            Найти
          </button>

        </form>

        <label className="theme-switch">

          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleTheme}
          />

          <span className="theme-slider"></span>

        </label>

      </div>

    </header>
  );
}

export default Header;