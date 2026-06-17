import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../services/api";

import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";
import StatsSection from "../components/StatsSection";

function Home() {
  const [news, setNews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [articles, setArticles] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
  API.get("/news-items?populate=*")
    .then((res) => {
      console.log("NEWS:", res.data);
      setNews(res.data.data || []);
    })
    .catch((err) => {
      console.error("NEWS ERROR:", err);
    });

  API.get("/blogs?populate=*")
    .then((res) => {
      console.log("BLOGS:", res.data);
      setBlogs(res.data.data || []);
    })
    .catch((err) => {
      console.error("BLOGS ERROR:", err);
    });

  API.get("/articles?populate=*")
    .then((res) => {
      console.log("ARTICLES:", res.data);
      setArticles(res.data.data || []);
    })
    .catch((err) => {
      console.error("ARTICLES ERROR:", err);
    });

  API.get("/events?populate=*")
    .then((res) => {
      console.log("EVENTS:", res.data);
      setEvents(res.data.data || []);
    })
    .catch((err) => {
      console.error("EVENTS ERROR:", err);
    });
}, []);

  const featuredNews = news.find(
    (item) => item.featured
  );

  const topNews = [...news]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  return (
    <>
      <Header />

      <div className="container">

        {featuredNews && (
          <div className="hero-wrapper">

            <div
              className="hero"
              style={{
                backgroundImage: `url(https://kaznews-backend.onrender.com${featuredNews.image?.url})`,
              }}
            >
              <div className="hero-overlay">

                <span className="hero-badge">
                  Главная новость
                </span>

                <h1>
                  {featuredNews.title}
                </h1>

                <p>
                  {featuredNews.description}
                </p>

              </div>
            </div>

            <aside className="sidebar-news">

              <h3>
                Последние новости
              </h3>

              {news.slice(0, 6).map((item) => (
                <Link
                  key={item.id}
                  to={`/news/${item.slug}`}
                  className="sidebar-item-link"
                >
                  <div className="sidebar-item">

                    <span className="sidebar-date">
                      {new Date(
                        item.publishedAt
                      ).toLocaleDateString("ru-RU")}
                    </span>

                    <h4>
                      {item.title}
                    </h4>

                  </div>
                </Link>
              ))}

            </aside>

          </div>
        )}

        <StatsSection
          newsCount={news.length}
          blogsCount={blogs.length}
          articlesCount={articles.length}
          eventsCount={events.length}
        />

        <h2 className="section-title">
          Самые читаемые
        </h2>

        <div className="top-news-list">

          {topNews.map((item, index) => (
            <Link
              key={item.id}
              to={`/news/${item.slug}`}
              className="top-news-item"
            >
              <span className="top-news-number">
                {index + 1}
              </span>

              <div>

                <h4>
                  {item.title}
                </h4>

                <span className="top-news-views">
                  👁 {item.views || 0}
                </span>

              </div>

            </Link>
          ))}

        </div>

        <h2 className="section-title">
          Популярное сегодня
        </h2>

        <div className="featured-grid">

          <div className="featured-big">
            {news.slice(0, 1).map((item) => (
              <NewsCard
                key={item.id}
                news={item}
                type="news"
              />
            ))}
          </div>

          <div className="featured-small">
            {news.slice(1, 4).map((item) => (
              <NewsCard
                key={item.id}
                news={item}
                type="news"
              />
            ))}
          </div>

        </div>

        <h2 className="section-title">
          Последние новости
        </h2>

        <div className="news-grid">
          {news.slice(0, 6).map((item) => (
            <NewsCard
              key={item.id}
              news={item}
              type="news"
            />
          ))}
        </div>

        <h2 className="section-title">
          Последние статьи
        </h2>

        <div className="news-grid">
          {articles.slice(0, 3).map((item) => (
            <NewsCard
              key={item.id}
              news={item}
              type="articles"
            />
          ))}
        </div>

        <h2 className="section-title">
          Популярные блоги
        </h2>

        <div className="news-grid">
          {blogs.slice(0, 3).map((item) => (
            <NewsCard
              key={item.id}
              news={item}
              type="blogs"
            />
          ))}
        </div>

        <h2 className="section-title">
          Ближайшие события
        </h2>

        <div className="news-grid">
          {events.slice(0, 3).map((item) => (
            <NewsCard
              key={item.id}
              news={item}
              type="events"
            />
          ))}
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Home;