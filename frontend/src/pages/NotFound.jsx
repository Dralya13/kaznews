import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notfound">

      <h1>404</h1>

      <h2>
        Страница не найдена
      </h2>

      <p>
        Возможно страница была удалена
        или вы ввели неверный адрес.
      </p>

      <Link
        to="/"
        className="notfound-btn"
      >
        На главную
      </Link>

    </div>
  );
}

export default NotFound;