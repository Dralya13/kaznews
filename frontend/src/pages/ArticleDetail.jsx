import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import API from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    API.get("/articles?populate=*")
      .then((res) => {
        const item = res.data.data.find(
          (a) => a.slug === slug
        );

        setArticle(item);
      })
      .catch(console.error);
  }, [slug]);

  if (!article) return <h2>Загрузка...</h2>;

  const imageUrl = article.image
    ? `https://kaznews-backend.onrender.com${article.image.url}`
    : "";

  return (
    <>
      <Header />

      <div className="article-container">
        <Link to="/articles" className="back-btn">
          ← Назад к статьям
        </Link>

        <img
          src={imageUrl}
          alt={article.title}
          className="article-image"
        />

        <div className="article-content">
          <h1>{article.title}</h1>

          <p className="article-description">
            {article.description}
          </p>

          {article.content?.map((block, index) => (
            <p key={index}>
              {block.children?.[0]?.text}
            </p>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ArticleDetail;