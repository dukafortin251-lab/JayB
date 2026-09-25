import Navbar from '../components/Navbar';
import GenreCard from '../components/GenreCard';

export default function Accueil() {
  const genres = [
    "Hip-Hop", "Amapiano", "Afrobeat", 
    "House", "Funk", "Krump",
    "R&B", "Trap", "Drill",
    "Jazz", "Soul", "Lo-Fi",
    "Reggae", "Dancehall", "Pop"
  ];

  return (
    <div className="page-accueil">
      <Navbar />
      
      <main className="main-content">
        <div className="genres-grid">
          {genres.map((genre, index) => (
            <GenreCard key={index} nom={genre} />
          ))}
        </div>

        <div className="bottom-section">
          <p className="info-text">
            We'll add these to your daily feed. You can change topics any time.
          </p>
          <button className="tag-button">TAG</button>
        </div>
      </main>
    </div>
  );
}