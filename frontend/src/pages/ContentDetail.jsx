import { useEffect, useState } from "react";
import {
  useParams,
  Link,
  useLocation,
} from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";

import API from "../services/api";

function ContentDetail() {
  const { slug } = useParams();
  const location = useLocation();

  const [content, setContent] =
    useState(null);

  const [allContent, setAllContent] =
    useState([]);

  let endpoint = "/news-items";
  let backLink = "/news";

  if (location.pathname.includes("/blogs/")) {
    endpoint = "/blogs";
    backLink = "/blogs";
  }

  if (
    location.pathname.includes("/articles/")
  ) {
    endpoint = "/articles";
    backLink = "/articles";
  }

  if (location.pathname.includes("/events/")) {
    endpoint = "/events";
    backLink = "/events";
  }

  useEffect(() => {
    API.get(`${endpoint}?populate=*`)
      .then((res) => {
        setAllContent(res.data.data);

        const item = res.data.data.find(
          (i) => i.slug === slug
        );

        setContent(item);
      })
      .catch(console.error);
  }, [slug, endpoint]);

  if (!content)
    return (
      <>
        <Header />
        <div className="container">
          <h2>Загрузка...</h2>
        </div>
        <Footer />
      </>
    );

  const imageUrl = content.image
    ? `http://localhost:1337${content.image.url}`
    : "https://via.placeholder.com/1200x700";

  const relatedContent =
    allContent
      .filter(
        (item) => item.id !== content.id
      )
      .slice(0, 3);

  return (
    <>
      <Header />

      <div className="article-layout">

        <main className="article-main">

          <Link
            to={backLink}
            className="back-btn"
          >
            ← Назад
          </Link>

          <img
            src={imageUrl}
            alt={content.title}
            className="article-image"
          />

          <div className="article-content">

            <div className="article-meta">

              <span>
                {new Date(
                  content.publishedAt
                ).toLocaleDateString(
                  "ru-RU"
                )}
              </span>

              <span>
                👁 {content.views || 0}
              </span>

            </div>

            <h1>{content.title}</h1>

            <p className="article-description">
              {content.description}
            </p>

            {content.content?.map(
              (block, index) => (
                <p key={index}>
                  {
                    block.children?.[0]
                      ?.text
                  }
                </p>
              )
            )}

          </div>

          <div className="related-news">

            <h2>
              Рекомендуем также
            </h2>

            <div className="news-grid">

              {relatedContent.map(
                (item) => (
                  <NewsCard
                    key={item.id}
                    news={item}
                    type={
                      endpoint.replace(
                        "/",
                        ""
                      )
                    }
                  />
                )
              )}

            </div>

          </div>

        </main>

        <aside className="article-sidebar">

          <h3>
            Последние материалы
          </h3>

          {allContent
            .slice(0, 5)
            .map((item) => (
              <Link
                key={item.id}
                to={`${backLink}/${item.slug}`}
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

                  <h4>
                    {item.title}
                  </h4>

                </div>
              </Link>
            ))}

        </aside>

      </div>

      <Footer />
    </>
  );
}

export default ContentDetail;