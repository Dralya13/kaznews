import { useEffect, useState } from "react";
import API from "../services/api";

import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";

function BlogsPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get("/blogs?populate=*")
      .then((res) => setBlogs(res.data.data))
      .catch(console.error);
  }, []);

  const featured = blogs[0];
  const list = blogs.slice(1);

  return (
    <>
      <Header />

      <div className="container">

        <h1 className="page-title">
          Блоги
        </h1>

        {featured && (
          <div className="page-hero">

            <img
              src={`https://kaznews-backend.onrender.com${featured.image?.url}`}
              alt={featured.title}
            />

            <div className="page-hero-content">

              <span className="page-badge">
                Популярный блог
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
              type="blogs"
            />
          ))}
        </div>

      </div>

      <Footer />
    </>
  );
}

export default BlogsPage;