function StatsSection({
  newsCount,
  blogsCount,
  articlesCount,
  eventsCount,
}) {
  return (
    <div className="stats-grid">

      <div className="stat-card">
        <h3>{newsCount}</h3>
        <p>Новостей</p>
      </div>

      <div className="stat-card">
        <h3>{blogsCount}</h3>
        <p>Блогов</p>
      </div>

      <div className="stat-card">
        <h3>{articlesCount}</h3>
        <p>Статей</p>
      </div>

      <div className="stat-card">
        <h3>{eventsCount}</h3>
        <p>Событий</p>
      </div>

    </div>
  );
}

export default StatsSection;