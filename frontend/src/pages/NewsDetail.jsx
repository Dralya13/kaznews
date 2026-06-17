import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import API from "../services/api";

import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";

function NewsDetail() {
  const { slug } = useParams();

  const [news, setNews] = useState(null);
  const [allNews, setAllNews] = useState([]);

  useEffect(() => {
    API.get("/news-items?populate=*")
      .then((res) => {
        const items = res.data.data;

        setAllNews(items);

        const currentNews = items.find(
          (item) => item.slug === slug
        );

        setNews(currentNews);
      })
      .catch(console.error);
  }, [slug]);

  if (!news) {
    return (
      <>
        <Header />
        <div className="container">
          <h2>Загрузка...</h2>
        </div>
        <Footer />
      </>
    );
  }

  const imageUrl = news.image
    ? `http://localhost:1337${news.image.url}`
    : "https://via.placeholder.com/1200x700";

  const relatedNews = allNews
    .filter((item) => item.id !== news.id)
    .slice(0, 3);

  const latestNews = [...allNews]
    .sort(
      (a, b) =>
        new Date(b.publishedAt) -
        new Date(a.publishedAt)
    )
    .slice(0, 5);

  return (
    <>
      <Header />

      <div className="article-layout">

        <main className="article-main">

          <Link
            to="/news"
            className="back-btn"
          >
            ← Назад к новостям
          </Link>

          <img
            src={imageUrl}
            alt={news.title}
            className="article-image"
          />

          <div className="article-content">

            <div className="article-meta">

              <span>
                {new Date(
                  news.publishedAt
                ).toLocaleDateString("ru-RU")}
              </span>

              <span>
                👁 {news.views || 0}
              </span>

            </div>

            <h1>{news.title}</h1>

            <p className="article-description">
              {news.description}
            </p>

            {news.content?.map(
              (block, index) => (
                <p key={index}>
                  {block.children?.[0]?.text}
                </p>
              )
            )}

          </div>

          <div className="related-news">

            <h2>
              Читайте также
            </h2>

            <div className="news-grid">

              {relatedNews.map((item) => (
                <NewsCard
                  key={item.id}
                  news={item}
                  type="news"
                />
              ))}

            </div>

          </div>

        </main>

        <aside className="article-sidebar">

          <h3>
            Последние новости
          </h3>

          {latestNews.map((item) => (
            <Link
              key={item.id}
              to={`/news/${item.slug}`}
              className="sidebar-item-link"
            >
              <div className="sidebar-item">

                <span className="sidebar-date">
                  {new Date(
                    item.publishedAt
                  ).toLocaleDateString(
                    "ru-RU"
                  )}
                </span>

                <h4>{item.title}</h4>

              </div>
            </Link>
          ))}

        </aside>

      </div>

      <Footer />
    </>
  );
}

export default NewsDetail;