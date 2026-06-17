import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import NewsPage from "./pages/NewsPage";
import BlogsPage from "./pages/BlogsPage";
import ArticlesPage from "./pages/ArticlesPage";
import EventsPage from "./pages/EventsPage";

import NewsDetail from "./pages/NewsDetail";
import ContentDetail from "./pages/ContentDetail";

import SearchPage from "./pages/SearchPage";

import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import FeedbackPage from "./pages/FeedbackPage";

import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/news"
          element={<NewsPage />}
        />

        <Route
          path="/blogs"
          element={<BlogsPage />}
        />

        <Route
          path="/articles"
          element={<ArticlesPage />}
        />

        <Route
          path="/events"
          element={<EventsPage />}
        />

        <Route
          path="/search"
          element={<SearchPage />}
        />

        <Route
          path="/about"
          element={<AboutPage />}
        />

        <Route
          path="/contacts"
          element={<ContactsPage />}
        />

        <Route
          path="/feedback"
          element={<FeedbackPage />}
        />

        <Route
          path="/news/:slug"
          element={<NewsDetail />}
        />

        <Route
          path="/blogs/:slug"
          element={<ContentDetail />}
        />

        <Route
          path="/articles/:slug"
          element={<ContentDetail />}
        />

        <Route
          path="/events/:slug"
          element={<ContentDetail />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;