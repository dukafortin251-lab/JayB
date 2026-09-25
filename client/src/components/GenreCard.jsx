export default function GenreCard({ nom }) {
  return (
    <div className="genre-card">
      <div className="card-image-placeholder">
        <button className="add-btn">⊕</button>
      </div>
      <div className="card-title">
        {nom.toUpperCase()}
      </div>
    </div>
  );
}