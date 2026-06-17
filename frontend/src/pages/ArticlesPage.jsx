import { useEffect, useState } from "react";
import API from "../services/api";

import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";

function ArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    API.get("/articles?populate=*")
      .then((res) => setArticles(res.data.data))
      .catch(console.error);
  }, []);

  const featured = articles[0];
  const list = articles.slice(1);

  return (
    <>
      <Header />

      <div className="container">

        <h1 className="page-title">
          Статьи
        </h1>

        {featured && (
          <div className="page-hero">

            <img
              src={`https://kaznews-backend.onrender.com${featured.image?.url}`}
              alt={featured.title}
            />

            <div className="page-hero-content">

              <span className="page-badge">
                Рекомендуем
              </span>

              <h2>{featured.title}</h2>

              <p>{featured.description}</p>

            </div>

          </div>
        )}

        <div className="news-grid">
          {list.map((item) => (
            <NewsCard
              key={item.id}
              news={item}
              type="articles"
            />
          ))}
        </div>

      </div>

      <Footer />
    </>
  );
}

export default ArticlesPage;