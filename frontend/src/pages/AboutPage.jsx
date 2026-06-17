import Header from "../components/Header";
import Footer from "../components/Footer";

function AboutPage() {
  return (
    <>
      <Header />

      <div className="container">

        <h1 className="page-title">
          О проекте
        </h1>

        <div className="info-page">

          <p>
            KAZNEWS — современный информационный
            портал Республики Казахстан.
          </p>

          <p>
            Проект предназначен для публикации
            новостей, статей, блогов и событий.
          </p>

          <p>
            Пользователи могут получать
            актуальную информацию,
            искать материалы и просматривать
            самые популярные публикации.
          </p>

          <h2>Технологии проекта</h2>

          <ul>
            <li>React</li>
            <li>React Router</li>
            <li>Axios</li>
            <li>Strapi CMS</li>
            <li>REST API</li>
          </ul>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default AboutPage;