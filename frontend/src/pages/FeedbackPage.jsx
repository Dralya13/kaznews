import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

function FeedbackPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    alert(
      "Сообщение успешно отправлено!"
    );

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Header />

      <div className="container">

        <h1 className="page-title">
          Обратная связь
        </h1>

        <form
          className="feedback-form"
          onSubmit={sendMessage}
        >

          <input
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <textarea
            rows="6"
            placeholder="Сообщение"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            required
          />

          <button type="submit">
            Отправить
          </button>

        </form>

      </div>

      <Footer />
    </>
  );
}

export default FeedbackPage;