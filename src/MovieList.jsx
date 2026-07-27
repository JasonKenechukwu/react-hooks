import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <section className="movie-list">
      {movies.length > 0 ? (
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      ) : (
        <p className="empty-state">No movies match your current filters.</p>
      )}
    </section>
  );
}

export default MovieList;
