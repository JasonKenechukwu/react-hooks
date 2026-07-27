import { useState } from "react";

const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">
      <rect width="100%" height="100%" fill="#334155" />
      <rect x="120" y="140" width="360" height="520" rx="24" fill="#475569" />
      <circle cx="300" cy="340" r="92" fill="#94a3b8" />
      <rect x="188" y="470" width="224" height="40" rx="20" fill="#cbd5e1" />
      <text x="300" y="760" text-anchor="middle" font-size="28" font-family="Arial, sans-serif" fill="#f8fafc">No poster available</text>
    </svg>
  `);

function MovieCard({ movie }) {
  const [hasImageError, setHasImageError] = useState(false);
  const imageSrc =
    hasImageError || !movie.posterURL ? FALLBACK_IMAGE : movie.posterURL;

  return (
    <article className="movie-card">
      <img
        src={imageSrc}
        alt={`${movie.title} poster`}
        className="movie-poster"
        onError={() => setHasImageError(true)}
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
        <div className="movie-rating">⭐ {movie.rating}/5</div>
      </div>
    </article>
  );
}

export default MovieCard;
