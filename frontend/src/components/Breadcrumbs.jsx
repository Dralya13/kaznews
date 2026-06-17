import { Link } from "react-router-dom";

function Breadcrumbs({
  section,
  title,
  link,
}) {
  return (
    <div className="breadcrumbs">

      <Link to="/">
        Главная
      </Link>

      <span>›</span>

      <Link to={link}>
        {section}
      </Link>

      <span>›</span>

      <span>{title}</span>

    </div>
  );
}

export default Breadcrumbs;