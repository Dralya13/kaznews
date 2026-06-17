import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import API from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    API.get("/blogs?populate=*")
      .then((res) => {
        const item = res.data.data.find(
          (b) => b.slug === slug
        );

        setBlog(item);
      })
      .catch(console.error);
  }, [slug]);

  if (!blog) return <h2>Загрузка...</h2>;

  const imageUrl = blog.image
    ? `http://localhost:1337${blog.image.url}`
    : "";

  return (
    <>
      <Header />

      <div className="article-container">
        <Link to="/blogs" className="back-btn">
          ← Назад к блогам
        </Link>

        <img
          src={imageUrl}
          alt={blog.title}
          className="article-image"
        />

        <div className="article-content">
          <h1>{blog.title}</h1>

          <p className="article-description">
            {blog.description}
          </p>

          {blog.content?.map((block, index) => (
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

export default BlogDetail;