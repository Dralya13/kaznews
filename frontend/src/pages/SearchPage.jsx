import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import API from "../services/api";

import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";

function SearchPage() {
  const [searchParams] = useSearchParams();

  const query =
    searchParams.get("q")?.toLowerCase() || "";

  const [results, setResults] = useState([]);

  useEffect(() => {
    Promise.all([
      API.get("/news-items?populate=*"),
      API.get("/blogs?populate=*"),
      API.get("/articles?populate=*"),
      API.get("/events?populate=*"),
    ])
      .then(
        ([
          newsRes,
          blogsRes,
          articlesRes,
          eventsRes,
        ]) => {
          const news = newsRes.data.data.map(
            (item) => ({
              ...item,
              type: "news",
            })
          );

          const blogs = blogsRes.data.data.map(
            (item) => ({
              ...item,
              type: "blogs",
            })
          );

          const articles =
            articlesRes.data.data.map(
              (item) => ({
                ...item,
                type: "articles",
              })
            );

          const events =
            eventsRes.data.data.map(
              (item) => ({
                ...item,
                type: "events",
              })
            );

          const allContent = [
            ...news,
            ...blogs,
            ...articles,
            ...events,
          ];

          const filtered =
            allContent.filter((item) => {
              const title =
                item.title?.toLowerCase() || "";

              const description =
                item.description?.toLowerCase() ||
                "";

              return (
                title.includes(query) ||
                description.includes(query)
              );
            });

          setResults(filtered);
        }
      )
      .catch(console.error);
  }, [query]);

  return (
    <>
      <Header />

      <div className="container">

        <h1 className="page-title">
          Поиск: "{query}"
        </h1>

        <p className="search-count">
          Найдено материалов: {results.length}
        </p>

        <div className="news-grid">
          {results.map((item) => (
            <NewsCard
              key={`${item.type}-${item.id}`}
              news={item}
              type={item.type}
            />
          ))}
        </div>

      </div>

      <Footer />
    </>
  );
}

export default SearchPage;