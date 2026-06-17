import Header from "../components/Header";
import Footer from "../components/Footer";

function ContactsPage() {
  return (
    <>
      <Header />

      <div className="container">

        <h1 className="page-title">
          Контакты
        </h1>

        <div className="contacts-box">

          <p>
            📍 Астана, Казахстан
          </p>

          <p>
            ☎ +7 (777) 123-45-67
          </p>

          <p>
            ✉ info@kaznews.kz
          </p>

          <p>
            🕒 Пн-Пт 09:00 - 18:00
          </p>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default ContactsPage;