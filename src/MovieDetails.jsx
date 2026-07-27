import { Link, useParams } from "react-router-dom";

function MovieDetails({ movies }) {
  const { movieId } = useParams();
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return (
      <section className="details-page">
        <Link to="/" className="back-link">
          ← Back to home
        </Link>
        <div className="details-card">
          <h2>Movie not found</h2>
          <p>The selected movie could not be found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="details-page">
      <Link to="/" className="back-link">
        ← Back to home
      </Link>

      <div className="details-card">
        <img
          src={movie.posterURL}
          alt={`${movie.title} poster`}
          className="details-poster"
        />

        <div className="details-content">
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <p className="movie-rating">⭐ {movie.rating}/5</p>

          <h3>Trailer</h3>
          <iframe
            src={movie.trailerLink}
            title={`${movie.title} trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
