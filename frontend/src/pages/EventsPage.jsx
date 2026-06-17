import { useEffect, useState } from "react";
import API from "../services/api";

import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";

function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events?populate=*")
      .then((res) => setEvents(res.data.data))
      .catch(console.error);
  }, []);

  const featured = events[0];
  const list = events.slice(1);

  return (
    <>
      <Header />

      <div className="container">

        <h1 className="page-title">
          События
        </h1>

        {featured && (
          <div className="page-hero">

            <img
              src={`http://localhost:1337${featured.image?.url}`}
              alt={featured.title}
            />

            <div className="page-hero-content">

              <span className="page-badge">
                Ближайшее событие
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
              type="events"
            />
          ))}
        </div>

      </div>

      <Footer />
    </>
  );
}

export default EventsPage;