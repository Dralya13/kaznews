function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>KAZNEWS</h2>

        <p>
          Независимый новостной портал
          Республики Казахстан
        </p>

        <div className="footer-links">
          <a href="/">Главная</a>
          <a href="/news">Новости</a>
          <a href="/blogs">Блоги</a>
          <a href="/articles">Статьи</a>
          <a href="/events">События</a>
        </div>

        <p className="copyright">
          © 2026 KazNews
        </p>
      </div>
    </footer>
  );
}

export default Footer;