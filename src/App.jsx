import { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Filter from "./Filter";
import MovieDetails from "./MovieDetails";
import MovieList from "./MovieList";

const initialMovies = [
  {
    id: 1,
    title: "Interstellar",
    description: "A team travels through a wormhole to save humanity.",
    posterURL:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    trailerLink: "https://www.youtube.com/embed/zSWdZVtXT7E",
  },
  {
    id: 2,
    title: "The Matrix",
    description: "A hacker discovers the truth behind reality.",
    posterURL:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80",
    rating: 4,
    trailerLink: "https://www.youtube.com/embed/vKQi3bBA1y8",
  },
  {
    id: 3,
    title: "Stranger Things",
    description: "A group of kids uncover a supernatural mystery.",
    posterURL:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
    rating: 4,
    trailerLink: "https://www.youtube.com/embed/b9EkMc79ZSU",
  },
];

function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [titleFilter, setTitleFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    posterURL: "",
    trailerLink: "",
    rating: 3,
  });

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesTitle = movie.title
        .toLowerCase()
        .includes(titleFilter.toLowerCase());
      const matchesRating = movie.rating >= ratingFilter;
      return matchesTitle && matchesRating;
    });
  }, [movies, titleFilter, ratingFilter]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title || !formData.description || !formData.posterURL) {
      return;
    }

    const newMovie = {
      id: Date.now(),
      ...formData,
      rating: Number(formData.rating),
    };

    setMovies((currentMovies) => [newMovie, ...currentMovies]);
    setFormData({
      title: "",
      description: "",
      posterURL: "",
      trailerLink: "",
      rating: 3,
    });
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">React Hooks checkpoint</p>
          <h1>Movie Explorer</h1>
          <p className="subtitle">
            Add your favorites and filter them by title or rating.
          </p>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <section className="content-grid">
              <form className="movie-form" onSubmit={handleSubmit}>
                <h2>Add a movie</h2>
                <label>
                  <span>Title</span>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Movie title"
                  />
                </label>
                <label>
                  <span>Description</span>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Short description"
                  />
                </label>
                <label>
                  <span>Poster URL</span>
                  <input
                    type="text"
                    value={formData.posterURL}
                    onChange={(e) =>
                      setFormData({ ...formData, posterURL: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </label>
                <label>
                  <span>Trailer link</span>
                  <input
                    type="text"
                    value={formData.trailerLink || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, trailerLink: e.target.value })
                    }
                    placeholder="https://www.youtube.com/embed/..."
                  />
                </label>
                <label>
                  <span>Rating</span>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rating: Number(e.target.value),
                      })
                    }
                  />
                </label>
                <button type="submit">Add movie</button>
              </form>

              <div className="movies-panel">
                <Filter
                  titleFilter={titleFilter}
                  ratingFilter={ratingFilter}
                  onTitleChange={setTitleFilter}
                  onRatingChange={setRatingFilter}
                />
                <MovieList movies={filteredMovies} />
              </div>
            </section>
          }
        />
        <Route
          path="/movie/:movieId"
          element={<MovieDetails movies={movies} />}
        />
      </Routes>
    </div>
  );
}

export default App;
