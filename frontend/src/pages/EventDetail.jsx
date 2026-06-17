import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import API from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

function EventDetail() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    API.get("/events?populate=*")
      .then((res) => {
        const item = res.data.data.find(
          (e) => e.slug === slug
        );

        setEvent(item);
      })
      .catch(console.error);
  }, [slug]);

  if (!event) return <h2>Загрузка...</h2>;

  const imageUrl = event.image
    ? `https://kaznews-backend.onrender.com${event.image.url}`
    : "";

  return (
    <>
      <Header />

      <div className="article-container">
        <Link to="/events" className="back-btn">
          ← Назад к событиям
        </Link>

        <img
          src={imageUrl}
          alt={event.title}
          className="article-image"
        />

        <div className="article-content">
          <h1>{event.title}</h1>

          <p className="article-description">
            {event.description}
          </p>

          <p>
            <strong>Место:</strong> {event.location}
          </p>

          <p>
            <strong>Дата:</strong> {event.eventDate}
          </p>

          {event.content?.map((block, index) => (
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

export default EventDetail;