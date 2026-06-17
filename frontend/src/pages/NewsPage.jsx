import { useEffect, useState } from "react";
import API from "../services/api";

import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";

function NewsPage() {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Все");

  useEffect(() => {
    API.get("/news-items?populate=*")
      .then((res) => setNews(res.data.data))
      .catch(console.error);
  }, []);

  const categories = [
    "Все",
    "Политика",
    "Экономика",
    "Технологии",
    "Спорт",
    "Общество",
  ];

  const filteredNews =
    selectedCategory === "Все"
      ? news
      : news.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <>
      <Header />

      <div className="container">

        <h1 className="page-title">
          Новости Казахстана
        </h1>

        <div className="categories">

          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? "category-btn active-category"
                  : "category-btn"
              }
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}
            </button>
          ))}

        </div>

        <div className="news-grid">

          {filteredNews.map((item) => (
            <NewsCard
              key={item.id}
              news={item}
              type="news"
            />
          ))}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default NewsPage;