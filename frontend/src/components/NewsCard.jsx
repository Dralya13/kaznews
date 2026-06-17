import { Link } from "react-router-dom";

function NewsCard({ news, type = "news" }) {
  const imageUrl = news.image?.url
    ? `https://kaznews-backend.onrender.com${news.image.url}`
    : "https://via.placeholder.com/600x400";

  const date = new Date(
    news.publishedAt
  ).toLocaleDateString("ru-RU");
  console.log("NEWS OBJECT:", news);
  console.log(
    "IMAGE URL:",
    news.image?.url
      ? `https://kaznews-backend.onrender.com${news.image.url}`
      : "NO IMAGE"
  );
  return (
    <Link
      to={`/${type}/${news.slug}`}
      className="news-link"
    >
      <article className="news-card">

        <div className="news-image-wrapper">
          <img
            src={imageUrl}
            alt={news.title}
            className="news-image"
          />
        </div>

        <div className="news-content">

          <div className="news-meta">

            <span className="news-date">
              {date}
            </span>

            <span className="news-views">
              👁 {news.views || 0}
            </span>

          </div>

          <h3>{news.title}</h3>

          <p>{news.description}</p>

        </div>

      </article>
    </Link>
  );
}

export default NewsCard;